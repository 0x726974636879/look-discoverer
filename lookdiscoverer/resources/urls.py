
from django.urls import path

from .views import ListLooksView, UpdateLooksView

app_name = "resources"

# Apps urls.
urlpatterns = [
    path("looks/", ListLooksView.as_view(), name="list-look"),
    path("looks/<look_id>/", UpdateLooksView.as_view(), name="update-look")
]
