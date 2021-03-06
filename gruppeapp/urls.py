from django.conf.urls import url
from django.contrib.auth.views import logout
from django.conf import settings
from . import views

app_name='gruppeapp'
urlpatterns = [

    url(r'^viewgroup/(?P<linkhash>[0-9a-z]{32})$', views.viewgroup, name='viewgroup'),
    url(r'^creategroupfromclass/$', views.Creategroupfromclass.as_view(), name="creategroupfromclass"),
    url(r'^creategroup/$', views.Creategroup.as_view(), name="creategroup"),
    url(r'^register/$', views.SignUpView.as_view(), name="register"),
    url(r'^login/$', views.LoginView.as_view(), name="login"),
    url(r'^logout/$', logout, {'next_page': settings.LOGOUT_REDIRECT_URL}, name="logout"),
    url(r'^myclasses/(?P<currentclass>[0-9]{1,})$', views.MyClassesView.as_view(), name="myclasses"),
    url(r'^myclasses/createnewclass/$', views.CreateNewClass.as_view(),name="createnewclass"),
    url(r'^myclasses/deleteclass/$', views.DeleteClass.as_view(), name="deleteclass"),
    url(r'^myclasses/$', views.MyClassesView.as_view(), name="myclasses"),
    url(r'^(?P<selectedclassid>[0-9]{1,})$', views.makegroup, name='makegroupwithclassid'),
    url(r'^about/$', views.About.as_view(), name="about"),
    url(r'^privacypolicy/$', views.privacypolicy, name="privacypolicy"),
    url(r'^$', views.makegroup, name='makegroup'),

]
