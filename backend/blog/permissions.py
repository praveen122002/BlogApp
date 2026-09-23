from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):

    def has_object_permission(self, request, view, obj):

        # GET, HEAD and OPTIONS are allowed
        # for authenticated users.
        if request.method in SAFE_METHODS:
            return True

        # PUT, PATCH and DELETE
        # are allowed only for the owner.
        return obj.author == request.user