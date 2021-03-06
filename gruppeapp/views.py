# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.datastructures import MultiValueDictKeyError
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from django.views import View
from random import shuffle, randint
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.password_validation import validate_password, password_validators_help_texts
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from .models import Gruppe, GruppeElev, Klasse, Elev, Advertisement
from .forms import UserForm, LoginForm
import uuid

import operator
# Create your views here.
#Here, users can enter student names etc. and submit.

def makegroup(request, selectedclassid=0):
    loginform = LoginForm(None)
    error = False
    errormessage = ""
    classes = None
    selectedclass = None

    if request.user.is_authenticated:
        classes = Klasse.objects.filter(user=request.user)
        if selectedclassid != 0:
            selectedclass = Klasse.objects.filter(id=selectedclassid).first()
    context = {"error": error, "errormessage": errormessage, "loginform": loginform, "classes":classes, "selectedclass":selectedclass}
    return render(request, "gruppeapp/welcome.html", context)

#Here, users can view the newly generated group!
class Creategroup(View):
    def post(self, request):
        numberofgroups = 1
        students = []
        studentCounter = request.POST["studentcounter"]
        numberofgroups = int(request.POST["numberofgroupsinput"])
        currentStudent=""
        """if int(request.POST["createfromclass"]) == 1:
            for i in range(0, int(studentCounter)+1):
                if int(request.POST["studentexists"+str(i)])==1:
                    if request.POST["student"+str(i)]:
                        students.append(request.POST["student"+str(i)])
                        
        else:"""
        print(str(request.POST))
        for i in range(0, int(studentCounter)+1):
            print("trying to find student "+str(i))
            try:
                if request.POST.get("student"+str(i),0) is not 0:
                    print("Added student "+str(i))
                    currentStudent = request.POST["student"+str(i)]
                    if currentStudent is not "":
                        students.append(currentStudent)
            except MultiValueDictKeyError:
                error = True
                errormessage = "No students added"
                print("Tried to find student"+str(i))
                print(str(request.POST))
                context = {"error": error, "errormessage": errormessage}
                return render(request, "gruppeapp/welcome.html", context)
            except ValueError:
                error = True
                errormessage = "You didn't choose how many groups should be made"
                context = {"error": error, "errormessage": errormessage}
                return render(request, "gruppeapp/welcome.html", context)

        shuffle(students)
        linkhash=uuid.uuid4().hex
        gruppe = Gruppe(link=linkhash, antalgrupper=numberofgroups)
        if request.user.is_authenticated():
            gruppe.user = request.user
        gruppe.save()

        for number, iterator in enumerate(students):
            student = GruppeElev(navn=iterator, position=number, gruppe=gruppe)
            student.save()

        return redirect("gruppeapp:viewgroup", linkhash=linkhash)
    def get(self,request):
        raise Http404("Page not found")

class Creategroupfromclass(View):
    def get(self,request):
        return redirect("gruppeapp:makegroup")
    def post(self,request):
        classid=request.POST["classid"]
        return redirect("gruppeapp:makegroupwithclassid", selectedclassid=classid)

class About(View):
    def get(self,request):
        return render(request, "gruppeapp/about.html", {"loginform":LoginForm(None)})
    def post(self, request):
        raise Http404("Page not found")

def viewgroup(request, linkhash):

    loginform = LoginForm(None)

    gruppe = Gruppe.objects.get(link=linkhash)
    students = []
    for student in GruppeElev.objects.filter(gruppe=gruppe):
        students.append(student)
    smallqueryset = Advertisement.objects.filter(size="small").order_by('?')
    bigqueryset = Advertisement.objects.filter(size="large").order_by('?')
    print(str(bigqueryset))
    smalloverhead = smallqueryset.first()
    bigoverhead = bigqueryset.first()
    try:
        smallunderhead = smallqueryset[1]
        bigunderhead = bigqueryset[1]
    except IndexError:
        smallunderhead = smalloverhead
        bigunderhead = bigoverhead

    context = {
    "students": students,
    "numberofgroups": gruppe.antalgrupper,
    "numberofgroupsrange": range(0,gruppe.antalgrupper),
    "loginform": loginform,
    "smalloverhead": smalloverhead,
    "bigoverhead": bigoverhead,
    "smallunderhead": smallunderhead,
    "bigunderhead": bigunderhead,
    }
    return render(request, "gruppeapp/viewgroup.html", context)

class SignUpView(View):
    form_class=UserForm
    template_name="gruppeapp/registration_form.html"

    def post(self, request):
        form = self.form_class(request.POST)
        loginform = LoginForm(None)

        if form.is_valid():
            user = form.save(commit=False)
            user.username = form.cleaned_data["username"]
            user.email = form.cleaned_data["email"]
            password = form.cleaned_data["password1"]
            try:
                validate_password(password)
            except(ValidationError):
                return render(request, self.template_name, {"form": form, "errorhelp": password_validators_help_texts(), "loginform": loginform,})
            user.set_password(password)
            user.save()

            user = authenticate(username=form.cleaned_data["username"], password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return redirect("gruppeapp:makegroup")
        return render(request, self.template_name, {"form": form,"errorhelp": password_validators_help_texts(), "loginform": loginform,})

    def get(self, request):
        form = self.form_class(None)
        loginform = LoginForm(None)

        return render(request, self.template_name, {"form": form,"errorhelp": password_validators_help_texts(), "loginform": loginform,})


class LoginView(View):
    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                if request.POST.get('remember_me', None):
                    print("remember_me!")
                    request.session.set_expiry(60*60*24*30)
                else:
                    print("No remember_me!")
                    request.session.set_expiry(360)
                return redirect("gruppeapp:makegroup")
            else:
                return redirect("gruppeapp:makegroup")
        else:
            return redirect("gruppeapp:makegroup")
    def get(self, request):
        return redirect("gruppeapp:makegroup")


class MyClassesView(View):
    template_name="gruppeapp/myclasses.html"


    def post(self, request):
        if request.user.is_authenticated:
            classid = 0
            #print("Post: "+str(sorted(request.POST, key=operator.itemgetter(0))))



            for key in request.POST: #Gets class id and deletes every student of that class
                if key.endswith("classid"):
                    classid = request.POST[key]
                    currentclass = Klasse.objects.filter(id=classid)[0]
                    currentclass.elev_set.all().delete()

            for key in sorted(request.POST): 
                if key.endswith("name"): #gets the name of a student and creates it.
                    currentstudentname = request.POST[key]
                    currentclass = Klasse.objects.filter(id=classid)[0]
                    student = Elev(navn=currentstudentname, klasse=currentclass)
                    student.save()

                elif key.endswith("newstudentname"):
                    currentstudentname = request.POST[key]
                    currentclass = Klasse.objects.filter(id=classid)[0]
                    student = Elev(navn=currentstudentname, klasse=currentclass)
                    student.save()



        classes = Klasse.objects.filter(user=request.user)
        classfromquery = classes.filter(pk=classid).first()
        return render(request, self.template_name,{"classes": classes, "loginform": LoginForm(None), "currentclass":classfromquery})

    def get(self, request, currentclass=0):
        if request.user.is_authenticated:
            classes = Klasse.objects.filter(user=request.user)
           # print("Thing!"+str(classes.first().id))
            print("Currentclass="+str(currentclass))
            if currentclass is not 0:
                classfromquery = classes.filter(pk=currentclass).first()
            else:
                classfromquery = classes.first()
            print("Class from query:"+str(classfromquery))
            context = {"classes": classes, "loginform": LoginForm(None), "currentclass": classfromquery}
            return render(request, self.template_name, context)
        else:
            context = {"loginerror": True, "loginform":LoginForm(None)}
            return render(request, self.template_name, context)

class CreateNewClass(View):
    def post(self, request):
        if request.user.is_authenticated:
            classname=request.POST["classname"]
            description = request.POST["classdescription"]
            newclass = Klasse(navn=classname, description=description, user=request.user)
            newclass.save()
            return redirect("gruppeapp:myclasses")
        else:
            raise Http404("Page not found")

    def get(self, request):
        return redirect("gruppeapp:myclasses")

class DeleteClass(View):
    def post(self, request):
        classid=request.POST["classid"]
        Klasse.objects.filter(id=classid).delete()
        return redirect("gruppeapp:myclasses")
    def get(self, request):
        return redirect("gruppeapp:myclasses")

def privacypolicy(request):
    return render(request, "gruppeapp/privacypolicy.htm")