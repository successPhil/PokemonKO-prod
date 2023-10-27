from Shop.models import Shop
from Items.models import Item

import json

def create_initial_shop():
    # Create Shop
    shop = Shop.objects.create()
    with open("Shop/initial_shop_items/initial_shop_items.json") as f:
        item_data = json.load(f)


    for item_info in item_data:
        item = Item.objects.create(
            name=item_info["name"],
            value=item_info["value"],
            stat_boost=item_info["stat_boost"],
            item_class=item_info["item_class"],
            item_type=item_info["item_type"],
            quantity=item_info["quantity"]
        )

        shop.items.add(item)

    return shop


        
