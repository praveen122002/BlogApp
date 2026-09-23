from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Blog


# -------------------------
# User Registration
# -------------------------
class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    password2 = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "password2"
        ]


    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username already exists."
            )

        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email already exists."
            )

        return value
      

    def validate(self, data):

        if not data.get("email"):
            raise serializers.ValidationError({
                "email": "Email is required."}
            )

        if data["password"] != data["password2"]:
            raise serializers.ValidationError(
                {"password": "Passwords do not match."}
            )

        return data


    def create(self, validated_data):

        validated_data.pop("password2")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        return user
    
# We use:
# User.objects.create_user(...)

# instead of:
# User.objects.create(...)

# because create_user() hashes the password.

# -------------------------
# Blog --- The logged-in user becomes the blog's author automatically.
# -------------------------

class BlogSerializer(serializers.ModelSerializer):

    author = serializers.ReadOnlyField(
        source="author.username"
    )

    class Meta:
        model = Blog
        fields = [
            "id",
            "title",
            "content",
            "author",
            "created_date",
            "updated_date"
        ]

    def validate_title(self, value):

        if not value.strip():
            raise serializers.ValidationError(
                "Title cannot be empty."
            )

        if len(value.strip()) < 3:
            raise serializers.ValidationError(
                "Title must contain at least 3 characters."
            )

        return value

    def validate_content(self, value):

        if not value.strip():
            raise serializers.ValidationError(
                "Content cannot be empty."
            )

        return value