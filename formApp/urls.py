from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("form/create/<str:form_id>", views.create_form, name="create_form"),
    path("form/<str:form_id>", views.view_form, name="form"),
    path("delete/<str:form_id>", views.delete_form, name="delete"),
    path("dashboard", views.dashboard, name="dashboard"),
]
