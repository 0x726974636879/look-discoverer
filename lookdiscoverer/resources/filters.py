import django_filters

from .models import Look


class LookListFilter(django_filters.rest_framework.FilterSet):
    look_name = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Look
        fields = ("look_name")
