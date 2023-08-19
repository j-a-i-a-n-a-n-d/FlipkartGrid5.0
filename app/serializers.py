from rest_framework import serializers
from .models import *
import re


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        # extra_kwargs = {
        #     "password": {
        #         "write_only": True
        #     }
        # }


class UserHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserHistory
        fields = "__all__"
