# class ProjectRouter:
#     route_app_labels={'store'}
#     def db_for_read(self,model, **hint):
#         if model.meta.app_label in self.route_app_labels:
#             return 'account'
#         return None