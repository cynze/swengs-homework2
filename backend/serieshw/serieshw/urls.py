from django.conf.urls import url
from django.urls import path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework_jwt.views import obtain_jwt_token

from django.contrib import admin
from . import views

schema_view = get_schema_view(
    openapi.Info(
        title='API',
        default_version='v1'
    ),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('series/options', views.series_option_list),
    path('author/options', views.author_option_list),

    path('episode/list', views.episodes_list),
    path('episode/create', views.episode_form_create),
    path('episode/<int:pk>/get', views.episode_form_get),
    path('episode/<int:pk>/update', views.episode_form_update),
    path('episode/<int:pk>/delete', views.episode_delete),

    path('author/list', views.author_list),
    path('author/create', views.author_form_create),
    path('author/<int:pk>/get', views.author_form_get),
    path('author/<int:pk>/update', views.author_form_update),
    path('author/<int:pk>/delete', views.author_delete),

    path('series/list', views.series_list),
    path('series/create', views.series_form_create),
    path('series/<int:pk>/get', views.series_form_get),
    path('series/<int:pk>/update', views.series_form_update),
    path('series/<int:pk>/delete', views.series_delete),

    url(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    url(r'^api-token-auth/', obtain_jwt_token),
]
