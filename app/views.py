from django.utils import timezone
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from .serializers import UserSerializer  # Import your UserSerializer here
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView, Response
from rest_framework import status
from .serializers import *
from decouple import config
import jwt
from rest_framework.permissions import IsAuthenticated
from tally.jwtauth import *
from .genai import *


class HomeView(APIView):
    def get(self, request):
        return Response('hi')


class RegisterView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            instance.set_password(request.data.get("password"))
            instance.save()
            response_data = {
                "id": serializer.data.get("id"),
                "username": serializer.data.get("username"),
                "email": serializer.data.get("email"),
                "password": serializer.data.get("password"),
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            raise AuthenticationFailed("Missing fields")

        user = User.objects.filter(email=email).first()
        if user is None or not user.check_password(password):
            raise AuthenticationFailed("Invalid credentials")

        payload = {
            "id": user.id,
            "exp": timezone.now() + timezone.timedelta(days=7),
            "iat": timezone.now()
        }
        token = jwt.encode(payload, config("JWT_SECRET"),
                           algorithm=config("JWT_ALGORITHM"))
        response = Response({
            "access_token": token
        })
        response.set_cookie(key="jwt", value=token, httponly=True)
        return response


class LogoutView(APIView):
    def post(self, req):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            "message": "success"
        }
        return response


class TextToImageView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.user.id
        prompt = request.data.get("text")
        try:
            print(user_id, prompt)  # <------------
            blob_url, new_prompt = text2image(prompt, user_id)
            print(blob_url, prompt)  # <------------
            user = User.objects.get(id=user_id)
            user_history = UserHistory.objects.create(
                user=user, description=new_prompt, blob_url=blob_url)
            user_history.save()
            response_data = {
                "user_id": user_id,
                "id": user_history.id,
                "blob_url": blob_url,
                "description": new_prompt,
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except:
            return Response("Error... Failed Task ", status=status.HTTP_400_BAD_REQUEST)


class UserHistoryListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        user_history = UserHistory.objects.filter(user_id=user_id)
        serializer = UserHistorySerializer(user_history, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
