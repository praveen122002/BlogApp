from django.urls import path
from .views import RegisterView, ProfileView, LogoutView,  BlogListCreateView, BlogDetailView
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView


urlpatterns = [

    path(
        "register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="login"
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

    path(
    "profile/",
    ProfileView.as_view(),
    name="profile"
    ),

    path(
    "logout/",
    LogoutView.as_view(),
    name="logout"
    ),

    path(
    "blogs/",
    BlogListCreateView.as_view(),
    name="blog-list-create"
    ),

    path(
    "blogs/<int:pk>/",
    BlogDetailView.as_view(),
    name="blog-detail"
    ),
]