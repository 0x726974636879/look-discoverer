from functools import reduce

from django.db.models import Q
from rest_framework.generics import ListAPIView, UpdateAPIView

# from .filters import LookListFilter
from .models import Look
from .serializers import LookSerializer, UpdateLookSerializer


class ListLooksView(ListAPIView):
    serializer_class = LookSerializer
    queryset = Look.objects.all().order_by("-hype_count")

    def filter_queryset(self, queryset):
        looks = super().filter_queryset(queryset)
        name = self.request.GET.get("name")
        hashtags = self.request.GET.get("hashtags")
        hype_count = self.request.GET.get("hype_count")
        if name:
            looks = looks.filter(look_name__icontains=name)
        if hashtags:
            query = reduce(
                lambda q, value: q & Q(hashtags__icontains=value),
                hashtags.split(','), Q()
            )
            looks = looks.filter(query)
        if hype_count:
            looks = looks.filter(hype_count=hype_count)
        return looks


class UpdateLooksView(UpdateAPIView):
    serializer_class = UpdateLookSerializer
    queryset = Look.objects.all()
    lookup_field = "look_id"
