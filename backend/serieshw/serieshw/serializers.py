from rest_framework import serializers
from .models import Episode, Series, Author


"""
class EpisodeOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = ['id', 'title_episode']
"""


class SeriesOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = ['id', 'title_series']


class AuthorOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'first_name', 'last_name']


class EpisodeListSerializer(serializers.ModelSerializer):
    series = serializers.SerializerMethodField()
    author = serializers.SerializerMethodField()

    class Meta:
        model = Episode
        fields = ['id', 'title_episode', 'genre', 'rate', 'season', 'release_date', 'series', 'author']

    def get_series(self, obj):
        return obj.series.title_series if obj.series else ''

    def get_author(self, obj):
        if obj:
            return {' ' + x.last_name for x in obj.author.all()}


class EpisodeFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Episode
        fields = '__all__'


class AuthorFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = '__all__'


class AuthorListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Author
        fields = ['id', 'first_name', 'last_name', 'birthday', 'gender', 'alive']


class SeriesFormSerializer(serializers.ModelSerializer):

    class Meta:
        model = Series
        fields = '__all__'


class SeriesListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Series
        fields = ['id', 'title_series', 'start_year', 'end_year', 'producer', 'style']
