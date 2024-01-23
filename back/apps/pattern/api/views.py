from django.http import JsonResponse
from rest_framework.views import APIView

from apps.pattern.api.serializers import PatternSerializer, PatternFullSerializer
from apps.pattern.models import Pattern


class LatestPattern(APIView):
    def get(self, request, *args, **kwargs):
        pattern = Pattern.objects.latest('id')
        return JsonResponse(PatternFullSerializer(pattern).data)
