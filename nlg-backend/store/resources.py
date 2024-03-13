from import_export import resources
from .models import MTOImport
from .models import Supplier
from .models import Item

class MTORescource(resources.ModelResource):
	class met:
		model = MTOImport


class SupplierRescource(resources.ModelResource):
	class met:
		model = Supplier



class ItemRescource(resources.ModelResource):
	class met:
		model = Item


