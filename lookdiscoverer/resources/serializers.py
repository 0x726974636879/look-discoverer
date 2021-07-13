import ast

from rest_framework import serializers

from .models import Look


class LookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Look
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["hashtags"] = ast.literal_eval(data.get("hashtags", []))
        return data


class UpdateLookSerializer(serializers.ModelSerializer):
    hashtags = serializers.JSONField(required=True)
    hype_count = serializers.CharField(required=True)

    class Meta:
        model = Look
        fields = (
            "country", "look_id", "look_name", "hype_count", "hashtags",
            "image_md5"
        )
        extra_kwargs = {
            "country": {"read_only": True},
            "look_id": {"read_only": True},
            "look_name": {"read_only": True},
            "image_md5": {"read_only": True}
        }
