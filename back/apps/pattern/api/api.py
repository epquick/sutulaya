from rest_framework.views import APIView

from apps.pattern.models import Pattern


class GetLatestFile(APIView):
    def get(self, request, *args, **kwargs):
        pattern = Pattern.objects.order_by('id').latest()
