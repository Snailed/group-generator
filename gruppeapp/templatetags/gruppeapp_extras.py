from django import template
register = template.Library()
abclist= "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
@register.filter
def abc(position):
    return abclist[position]