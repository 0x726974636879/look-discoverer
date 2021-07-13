from django.contrib import admin
from django.urls import path, include

# Administration urls.
urlpatterns = [
    path("admin/", admin.site.urls),
]

# Apps urls.
urlpatterns += [
    path("api/", include("resources.urls", namespace="resources"))
]

# Rest Framework urls.
urlpatterns += [
    path(
        "api-auth/", include("rest_framework.urls", namespace="rest_framework")
    )
]
