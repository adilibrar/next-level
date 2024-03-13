from store.models import CorVisionProfile,Floor,Elevation,ReleasedWindow,FinalReleasedWindowCustomShutter,ReleasedWindowCustomShutter,FinalReleasedWindowInterLock,FinalReleasedWindow,ReleasedCustomDim,FinalReleasedWindowProfile,ReleasedWindowGasket,ReleasedWindowScrew,ReleasedWindowPacking,ReleasedWindowGlass,ReleasedWindowACC,ReleasedWindowInterLockACC,ReleasedWindowProfile,ReleasedWindowInterLock,Lock,CORVISION,CorVisionDIM,CorVisionGlass,CorVisionShutter,CorVisionAcc,CorVisionGasket,CorScrew,CorPacking,CorVisionInterLock,CorVisionInterLockAcc
from rest_framework import serializers

# ReleasedCustomDim

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

class CorVisionInterProfileShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowInterLock
        fields=['ReleasedWindowInterProfile']

class FinalCorVisionReleasedProfileShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowProfile
        fields=['FReleasedWindowPItem']


class FinalCorVisioninterProfileShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowInterLock
        fields=['FReleasedWindowInterProfile']



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
        model = ReleasedWindow
        fields='__all__'
       

class ReleasedCustomDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedCustomDim
        fields='__all__'


class ReleasedCustomShutterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowCustomShutter
        fields='__all__'


class FinalReleasedCustomShutterSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowCustomShutter
        fields='__all__'

class GetReleasedCustomDimSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedCustomDim
        fields='__all__'


class ReleaseWindowSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindow
        fields='__all__'
        depth=1


class ReleaseWindowShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindow
        fields=['quantity']

class FinalReleaseWindowShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindow
        fields=['quantity']

        

        
class ReleaseWindowSerializerDepth(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindow
        fields='__all__'
        depth=2
       


class ReleaseWindowProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowProfile
        fields=['description','cutlength','quantity','cutting','coating','remark','ReleasedWindowPItem','ReleasedWindowP']
        depth=1


class FinalReleaseWindowProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowProfile
        fields=['description','cutlength','quantity','cutting','coating','remark','FReleasedWindowPItem','FReleasedWindowP']
        depth=1



class FinalReleaseWindowInterProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FinalReleasedWindowInterLock
        fields='__all__'
        depth=1



class ReleaseWindowInterLockSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowInterLock
        fields=['description','cutlength','quantity','cutting','coating','remark','ReleasedWindowInterProfile','ReleasedWindowInter']
        depth=1





class ReleaseWindowACCSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowACC
        fields=['description','quantity','cutting','coating','remark','ReleasedWindowAcc']
        depth=1


class ReleaseWindowInterlockACCSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowInterLockACC
        fields=['description','quantity','cutting','coating','remark','ReleasedWindowInterAcc']
        depth=1



class ReleaseWindowGasketSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowGasket
        fields=['description','cutlength','quantity','cutting','coating','remark','ReleasedWindowGasket']
        depth=1


class ReleaseWindowScrewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowScrew
        fields=['description','quantity','coating','remark','ReleasedWindowSc']
        depth=1


class ReleaseWindowPackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowPacking
        fields=['description','quantity','coating','remark','ReleasedWindowPac']
        depth=1



class ReleaseWindowGlassSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleasedWindowGlass
        fields=['title','width','height']