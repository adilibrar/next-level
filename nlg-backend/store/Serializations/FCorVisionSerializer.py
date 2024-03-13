from store.models import CorVisionProfile,Floor,Elevation,FinalReleasedCustomDim,FinalReleasedWindow,FinalReleasedWindowProfile,FinalReleasedWindowGlass,FinalReleasedWindowGasket,ReleasedWindowGasket,FinalReleasedWindowScrew,FinalReleasedWindowPacking,ReleasedWindowGlass,FinalReleasedWindowACC,FinalReleasedWindowInterLockACC,ReleasedWindowProfile,FinalReleasedWindowInterLock,Lock,CORVISION,CorVisionDIM,CorVisionGlass,CorVisionShutter,CorVisionAcc,CorVisionGasket,CorScrew,CorPacking,CorVisionInterLock,CorVisionInterLockAcc
from rest_framework import serializers



class CorVisionProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionProfile
        fields='__all__'
        depth=1

class CorVisionProfileSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionProfile
        fields='__all__'
     


class CorVisionProfileShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionProfile
        fields=['CorVisionItem']



class CorVisionReleasedProfileShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowProfile
        fields=['ReleasedWindowPItem']



class CorVisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CORVISION
        fields='__all__'
        depth=1

class CorVisionDIMSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionDIM
        fields='__all__'
        depth=1
class CorVisionShutterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionShutter
        fields='__all__'
        depth=1


class CorVisionGlassSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionGlass
        fields='__all__'
        depth=1


class CorVisionGlassSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionGlass
        fields='__all__'
 

class CorVisionAccSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionAcc
        fields='__all__'
        depth=1


class CorVisionAccSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionAcc
        fields='__all__'


class CorVisionGasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionGasket
        fields='__all__'
        depth=1


class CorVisionGasketSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionGasket
        fields='__all__'
    

class CorVisionScrewSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorScrew
        fields='__all__'
        depth=1



class CorVisionScrewSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorScrew
        fields='__all__'
   

class CorVisionPackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorPacking
        fields='__all__'
        depth=1



class CorVisionPackingSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorPacking
        fields='__all__'
   


class CorVisionInterLockSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionInterLock
        fields='__all__'
        depth=1

class CorVisionInterLockSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionInterLock
        fields='__all__'
       

class CorVisionInterLockAccSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionInterLockAcc
        fields='__all__'
        depth=1



class CorVisionInterLockSaveAccSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorVisionInterLockAcc
        fields='__all__'
   
class FloorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Floor
        fields='__all__'

class ElevationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Elevation
        fields='__all__'


class LockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lock
        fields='__all__'
        depth=1



class ReleaseWindowsaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindow
        fields='__all__'
       


class ReleaseWindowSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindow
        fields='__all__'
        depth=1


class ReleaseWindowShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindow
        fields=['quantity']

        
class ReleaseWindowSerializerDepth(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindow
        fields='__all__'
        depth=2
       


class ReleaseWindowProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowProfile
        fields=['description','cutlength','quantity','cutting','coating','remark','FReleasedWindowPItem','FReleasedWindowP']
        depth=1


class FinalReleasedCustomDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedCustomDim
        fields='__all__'



class ReleaseWindowInterLockSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowInterLock
        fields=['description','cutlength','quantity','cutting','coating','remark','FReleasedWindowInterProfile']
        depth=1



class ReleaseWindowACCSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowACC
        fields=['description','quantity','cutting','coating','remark','FReleasedWindowAcc']
        depth=1


class ReleaseWindowInterlockACCSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowInterLockACC
        fields=['description','quantity','cutting','coating','remark','FReleasedWindowInterAcc']
        depth=1



class ReleaseWindowGasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowGasket
        fields=['description','cutlength','quantity','cutting','coating','remark','FReleasedWindowGasket']
        depth=1


class ReleaseWindowScrewSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowScrew
        fields=['description','quantity','coating','remark','FReleasedWindowSc']
        depth=1


class ReleaseWindowPackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowPacking
        fields=['description','quantity','coating','remark','FReleasedWindowPac']
        depth=1



class ReleaseWindowGlassSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowGlass
        fields=['title','width','height']