from django.http import HttpResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import Series, Episode
from .serializers import *


@swagger_auto_schema(method='GET', responses={200: SeriesOptionSerializer(many=True)})
@api_view(['GET'])
def series_option_list(request):
    series = Series.objects.all()
    serializer = SeriesOptionSerializer(series, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: AuthorOptionSerializer(many=True)})
@api_view(['GET'])
def author_option_list(request):
    author = Author.objects.all()
    serializer = AuthorOptionSerializer(author, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: EpisodeListSerializer(many=True)})
@api_view(['GET'])
def episodes_list(request):
    series = Episode.objects.all()
    serializer = EpisodeListSerializer(series, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: AuthorListSerializer(many=True)})
@api_view(['GET'])
def author_list(request):
    author = Author.objects.all()
    serializer = AuthorListSerializer(author, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: SeriesListSerializer(many=True)})
@api_view(['GET'])
def series_list(request):
    series = Series.objects.all()
    serializer = SeriesListSerializer(series, many=True)
    return Response(serializer.data)


@swagger_auto_schema(method='POST', request_body=EpisodeFormSerializer, responses={200: EpisodeFormSerializer()})
@api_view(['POST'])
def episode_form_create(request):
    serializer = EpisodeFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='POST', request_body=AuthorFormSerializer, responses={200: AuthorFormSerializer()})
@api_view(['POST'])
def author_form_create(request):
    serializer = AuthorFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='POST', request_body=SeriesFormSerializer, responses={200: SeriesFormSerializer()})
@api_view(['POST'])
def series_form_create(request):
    serializer = SeriesFormSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=EpisodeFormSerializer, responses={200: EpisodeFormSerializer()})
@api_view(['PUT'])
def episode_form_update(request, pk):
    try:
        episode = Episode.objects.get(pk=pk)
    except Episode.DoesNotExist:
        return Response({'error': 'Episode does not exist.'}, status=404)

    serializer = EpisodeFormSerializer(episode, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=AuthorFormSerializer, responses={200: AuthorFormSerializer()})
@api_view(['PUT'])
def author_form_update(request, pk):
    try:
        author = Author.objects.get(pk=pk)
    except Author.DoesNotExist:
        return Response({'error': 'Author does not exist.'}, status=404)

    serializer = AuthorFormSerializer(author, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='PUT', request_body=SeriesFormSerializer, responses={200: SeriesFormSerializer()})
@api_view(['PUT'])
def series_form_update(request, pk):
    try:
        series = Series.objects.get(pk=pk)
    except Series.DoesNotExist:
        return Response({'error': 'Series does not exist.'}, status=404)

    serializer = SeriesFormSerializer(series, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@swagger_auto_schema(method='GET', responses={200: EpisodeFormSerializer()})
@api_view(['GET', 'DELETE'])
def episode_form_get(request, pk):
    try:
        episode = Episode.objects.get(pk=pk)
    except Episode.DoesNotExist:
        return Response({'error': 'Episode does not exist.'}, status=404)

    serializer = EpisodeFormSerializer(episode)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: AuthorFormSerializer()})
@api_view(['GET'])
def author_form_get(request, pk):
    try:
        author = Author.objects.get(pk=pk)
    except Author.DoesNotExist:
        return Response({'error': 'Author does not exist.'}, status=404)

    serializer = AuthorFormSerializer(author)
    return Response(serializer.data)


@swagger_auto_schema(method='GET', responses={200: SeriesFormSerializer()})
@api_view(['GET'])
def series_form_get(request, pk):
    try:
        series = Series.objects.get(pk=pk)
    except Series.DoesNotExist:
        return Response({'error': 'Series does not exist.'}, status=404)

    serializer = SeriesFormSerializer(series)
    return Response(serializer.data)


@api_view(['DELETE'])
def episode_delete(request, pk):
    try:
        episode = Episode.objects.get(pk=pk)
    except Series.DoesNotExist:
        return Response({'error': 'Episode does not exist.'}, status=404)
    episode.delete()
    return Response(status=204)


@api_view(['DELETE'])
def author_delete(request, pk):
    try:
        author = Author.objects.get(pk=pk)
    except Series.DoesNotExist:
        return Response({'error': 'Author does not exist.'}, status=404)
    author.delete()
    return Response(status=204)


@api_view(['DELETE'])
def series_delete(request, pk):
    try:
        series = Series.objects.get(pk=pk)
    except Series.DoesNotExist:
        return Response({'error': 'Series does not exist.'}, status=404)
    series.delete()
    return Response(status=204)

