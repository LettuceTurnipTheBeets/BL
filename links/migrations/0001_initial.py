# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(verbose_name='ID', primary_key=True, serialize=False, auto_created=True)),
                ('title', models.CharField(max_length=80)),
                ('link', models.CharField(max_length=200)),
                ('seen', models.BooleanField(default=False)),
                ('comments', models.CharField(max_length=1000)),
            ],
        ),
    ]
