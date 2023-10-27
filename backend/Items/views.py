from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from Trainer.models import Trainer
from Items.models import Item
from Items.serializers import ItemSerializer
class ItemsView(APIView):
    def put(self, request):
        user = request.user
        try:
            trainer = Trainer.objects.get(user=user)
            items_used = request.data.get('items_used')

            updated_items = []
            for item_id, qty_used in items_used.items():
                print(len(items_used))
                try:
                    item = trainer.items.get(id=item_id)
                    item.decrement_quantity(qty_used)
                    if item.quantity == 0:
                        return Response({"message": "Item quantity is now 0 and has been removed"}, status=status.HTTP_200_OK)
                    updated = trainer.items.get(id=item_id)
                    updated_items.append(updated)
                except Item.DoesNotExist:
                    return Response({"message": "Item does not exist in trainer"}, status=status.HTTP_400_BAD_REQUEST)
            if len(items_used) > 1:
                serializer = ItemSerializer(updated_items, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                serializer = ItemSerializer(updated)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Trainer.DoesNotExist:
            return Response({"message": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
        


