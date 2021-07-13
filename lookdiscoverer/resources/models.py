import uuid

from djongo import models


class Look(models.Model):
    look_id = models.CharField(
        max_length=255, primary_key=True, default=uuid.uuid4, editable=False
    )
    country = models.CharField(max_length=255, blank=True, null=True)
    look_name = models.CharField(max_length=255, blank=True, null=True)
    hype_count = models.IntegerField(blank=True, default=0)
    hashtags = models.JSONField(blank=True, null=True)
    image_md5 = models.CharField(max_length=255, blank=True, null=True)

    objects = models.DjongoManager()
