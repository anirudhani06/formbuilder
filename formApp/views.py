from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import Form, Field
import json


# Create your views here.


@csrf_exempt
def home(request):
    if request.method == "POST":
        form_name = request.POST.get("form_name")
        start_date = request.POST.get("start_date")
        end_date = request.POST.get("end_date")
        form = Form.objects.create(
            name=form_name, start_date=start_date, end_date=end_date
        )
        return redirect("create_form", str(form.id))
    return render(request, "formapp/home.html")


@csrf_exempt
def create_form(request, form_id):
    if request.method == "POST":
        data = json.loads(request.POST.get("data"))
        update_form = Form.objects.filter(id=request.POST.get("id")).first()
        if update_form is None:
            return HttpResponse("form not found")

        base = data.pop("base")
        formData = data.pop("formData")
        update_form.name = base["title"]
        update_form.submit = base["submitbtn"]
        update_form.save()

        for elem in formData:
            Field.objects.create(
                form=update_form,
                name=elem["name"],
                label=elem["label"],
                field_type=elem["type"],
                placeholder=elem["placeholder"],
                max_len=elem["maxLen"],
                min_len=elem["minLen"],
                required=elem["required"],
                rows=elem["rows"],
                position=elem["position"],
            )

        return redirect("dashboard")
    form = Form.objects.filter(id=form_id).first()
    form_elements = form.fields.all()
    if form is None:
        return HttpResponse("form not found")

    context = {"form": form, "form_elements": form_elements}
    return render(request, "formapp/bulder.html", context)


@csrf_exempt
def view_form(request, form_id):
    form = Form.objects.filter(id=form_id).first()
    if form is None:
        return HttpResponse("form not found")
    context = {"form": form}
    return render(request, "formapp/form.html", context)


def delete_form(request, form_id):
    form = Form.objects.filter(id=form_id).first()
    if form is None:
        return HttpResponse("form not found")
    form.delete()
    return redirect("dashboard")


def dashboard(request):
    forms = Form.objects.all()
    context = {"forms": forms}
    return render(request, "formapp/dashboard.html", context)
