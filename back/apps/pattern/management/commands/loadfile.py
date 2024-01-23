from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
import xml.etree.ElementTree as ET

from apps.pattern.models import Pattern, PatternCrossType, PatternCross


class Command(BaseCommand):
    def handle(self, *args, **options):
        tree = ET.parse('back/data_files/flower.oxs')

        properties = tree.find('properties')
        pattern = Pattern.objects.create(user=User.objects.all()[0],
                                         name=properties.attrib['charttitle'],
                                         width=properties.attrib['chartwidth'],
                                         height=properties.attrib['chartheight'])

        cross_types = {}
        start_symbol = 0x2600

        for palette_item in tree.findall('palette/palette_item'):
            attrib = palette_item.attrib

            if attrib['name'] == 'cloth':
                continue

            cross_types[attrib['index']] = PatternCrossType(pattern=pattern,
                                                            color=attrib['color'],
                                                            symbol=chr(start_symbol + len(cross_types)))

        PatternCrossType.objects.bulk_create(cross_types.values())

        crosses = []

        for stitch in tree.findall('fullstitches/stitch'):
            attrib = stitch.attrib

            if attrib['palindex'] not in cross_types:
                continue

            crosses.append(PatternCross(type=cross_types[attrib['palindex']],
                                        x_coord=attrib['x'],
                                        y_coord=attrib['y']))

        PatternCross.objects.bulk_create(crosses)


