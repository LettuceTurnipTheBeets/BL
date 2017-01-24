from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^login/$', views.user_login, name='login'),
    url(r'^logout/$', views.user_logout, name='logout'),
    url(r'^link_seen/$', views.link_seen, name='link_seen'),
    url(r'^link_add/$', views.link_add, name='link_add'),
    url(r'^link_delete/$', views.link_delete, name='link_delete'),
    url(r'^acknowledge_init/$', views.acknowledge_init),
]