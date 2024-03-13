from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class userDetailView(APIView):
	permission_classes=[IsAuthenticated]
	
	def get(self,request,*args,**kwargs):
		return Response({"username":request.user.username,"id":request.user.id,"first_name":request.user.first_name,})
	

