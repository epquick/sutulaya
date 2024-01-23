from rest_framework import serializers

from apps.pattern.models import Pattern, PatternCrossType, PatternCross


class PatternSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pattern
        fields = '__all__'


class PatternFullSerializer(serializers.ModelSerializer):
    cross_types = serializers.SerializerMethodField()
    crosses = serializers.SerializerMethodField()

    class Meta:
        model = Pattern
        fields = '__all__'

    def get_cross_types(self, obj):
        return {cross_type.id: PatternCrossTypeSerializer(cross_type).data for cross_type in  obj.cross_types.all()}

    def get_crosses(self, obj):
        crosses = PatternCross.objects.filter(type__pattern=obj).order_by('x_coord', 'y_coord')
        data = {}

        for cross in crosses:
            if cross.x_coord not in data:
                data[cross.x_coord] = {}
            data[cross.x_coord][cross.y_coord] = [cross.id, cross.is_done, cross.type_id]

        return data


class PatternCrossTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatternCrossType
        fields = '__all__'
