/* ==========================================================================
   Wongdhen Cafe — menu (feeds menu.html)
   --------------------------------------------------------------------------
   Sources (see brief/BRIEF.md §3):
   • BREAKFAST (8 am – 12 noon): the café's new breakfast card, photographed
     on the Google listing, matching the "all-new breakfast menu" posts on
     @wongdhencafe (Aug–Oct 2026).
   • EVERYTHING ELSE: the café's own printed menu, 16 pages, as uploaded to
     Zomato on 5 June 2025. Copied with its prices; only obvious spellings
     were tidied (Hakka, Tibetan, Moroccan, Buddha's).
   • Prices on Google's menu highlights (Oct 2026) are higher (probably the
     delivery-app menu). THE OWNER MUST CONFIRM ALL PRICES BEFORE LAUNCH.

   PRICES ON THE LIVE SITE (launch, 7 Oct 2026): only the 2026 breakfast card
   prices are shown. The June 2025 printed-menu prices are hidden until the
   owner confirms them (brief Q5/Q17). To show them again, set printedMenu: true.

   Format
   • price: 345              → one price
   • prices: [["Veg",345],["Chicken",405]] → priced options
   • price: null             → shown by name only ("Ask us")
   • veg: true / false       → green / red mark (omit when the item has both)
   • spl: true               → chef's special (chef hat on the printed menu)
   ========================================================================== */
window.WONGDHEN_PRICES = { breakfastCard: true, printedMenu: false };

window.WONGDHEN_MENU = [
  {
    id: "breakfast", label: "Breakfast",
    groups: [
      {
        id: "set-breakfasts", label: "Set breakfasts", image: "images/breakfast-sets.webp", source: "breakfast-card",
        note: "Served 8 am – 12 noon. Each set comes with a coffee (hot or iced) or a tea.",
        sub: [
          { label: "Set breakfasts", items: [
            { name: "Classic Vegetarian European Breakfast", price: 315, veg: true, desc: "Toast, baked beans, mushrooms, potato griddle, sautéed paneer & veggies." },
            { name: "Vegetarian Himalayan Breakfast", price: 315, veg: true, desc: "Two parathas, aloo dum, yogurt & red chutney." },
            { name: "Non-veg American Breakfast", price: 385, veg: false, desc: "Pancakes, potato griddle, two eggs, chicken sausage & bacon with maple syrup." },
            { name: "Non-veg European Breakfast", price: 385, veg: false, desc: "Toast, baked beans, two chicken sausages & two eggs your way." }
          ]},
          { label: "Egg specials", items: [
            { name: "Egg Benedict", price: 350, desc: "Poached eggs on brioche with hollandaise, potato griddle & salad." },
            { name: "Turkish Eggs", price: 350, desc: "Poached eggs over garlic yogurt with paprika butter & sourdough." },
            { name: "Hot Chilli Cheesy Sunny-Side Eggs", price: 350, desc: "Spicy cheesy eggs with sourdough." },
            { name: "Hot Honey Fried Eggs", price: 350, desc: "Crispy fried eggs glazed with hot honey." },
            { name: "3-Egg Omelette", prices: [["Plain", 330], ["Masala", 345], ["Cheese", 360]], desc: "Served with sourdough toast & potato griddle." }
          ]},
          { label: "Burritos", items: [
            { name: "Mushroom & Cottage Cheese Burrito", price: 350, veg: true },
            { name: "Scrambled Egg Burrito", price: 360 },
            { name: "Chicken Ham Egg Burrito", price: 390, veg: false }
          ]},
          { label: "Also on the new breakfast menu", items: [
            { name: "Tiramisu French Toast", price: null, desc: "Soft, indulgent and topped with creamy tiramisu." },
            { name: "Mushroom Croissant Sandwich", price: null, veg: true },
            { name: "Chicken Ham & Cheese Melt Sandwich", price: null, veg: false }
          ]}
        ]
      },
      {
        id: "all-day", label: "All-day breakfast", image: "images/spread.webp",
        sub: [
          { label: "All day", items: [
            { name: "French Toast", price: 230 },
            { name: "Pancakes", prices: [["Plain", 245], ["Strawberry", 260], ["Banana", 260], ["Nutella", 290]] },
            { name: "Waffle", prices: [["Plain", 245], ["Nutella", 270], ["Banana", 260]] }
          ]},
          { label: "Sides", items: [
            { name: "Grilled Veggies", price: 110, veg: true },
            { name: "Mash Potato", price: 135, veg: true },
            { name: "Corn Bread", price: 50 },
            { name: "Masala Pilaf Rice", price: 150, veg: true },
            { name: "Carrot Pilaf Rice", price: 150, veg: true }
          ]}
        ]
      }
    ]
  },
  {
    id: "asian", label: "Asian",
    groups: [
      {
        id: "dumplings", label: "Dumplings & momos", image: "images/dumplings.webp",
        note: "We do not use MSG in any of our dishes.",
        sub: [
          { label: "Crystal dumplings · veg (4 pc)", items: [
            { name: "Corn Cream Dumplings", price: 285, veg: true },
            { name: "Veg Kaffir Lime Dumplings", price: 285, veg: true },
            { name: "Shanghai Crystal Dumplings", price: 285, veg: true },
            { name: "Spinach Tofu Dumplings", price: 315, veg: true }
          ]},
          { label: "Crystal dumplings · chicken (4 pc)", items: [
            { name: "Chicken Chilly Oil Dumplings", price: 325, veg: false },
            { name: "Spicy Basil Chicken Dumplings", price: 325, veg: false },
            { name: "Fiery Chicken Dumplings", price: 325, veg: false },
            { name: "Truffle Oil Dumplings", price: 335, veg: false },
            { name: "Burnt Garlic Cashew Nut", price: 325, veg: false }
          ]},
          { label: "Crystal dumplings · prawn (4 pc)", items: [
            { name: "Spicy Prawn Dumplings", price: 345, veg: false },
            { name: "Prawn Har Gow Dumplings", price: 345, veg: false },
            { name: "Prawn Rainbow Dumplings", price: 345, veg: false },
            { name: "Prawn Truffle Oil Dumplings", price: 355, veg: false }
          ]},
          { label: "Shumai · open dumplings (4 pc / 8 pc)", items: [
            { name: "Veg Shumai", prices: [["4 pc", 145], ["8 pc", 225]], veg: true },
            { name: "Chicken Shumai", prices: [["4 pc", 175], ["8 pc", 285]], veg: false },
            { name: "Prawn Shumai", prices: [["4 pc", 195], ["8 pc", 305]], veg: false }
          ]},
          { label: "Momos & dimsum", items: [
            { name: "Steam Momos", prices: [["Mixed Veg", 205], ["Chicken", 255], ["Buff", 245], ["Pork", 255]] },
            { name: "Pan Fried Momos", prices: [["Mixed Veg", 220], ["Chicken", 270], ["Buff", 260], ["Pork", 270]] },
            { name: "Deep Fried Momos", prices: [["Mixed Veg", 220], ["Chicken", 270], ["Buff", 260], ["Pork", 270]] },
            { name: "Mushroom Dimsum", price: 195, veg: true },
            { name: "Veg Szechwan Dimsum", price: 185, veg: true },
            { name: "Corn Spring Onion Dimsum", price: 185, veg: true },
            { name: "Paneer Dimsum", price: 195, veg: true },
            { name: "Creamy Garlic Dimsum", prices: [["Veg", 225], ["Chicken", 275], ["Buff", 270]] },
            { name: "Tibetan Shabalay (2 pc)", prices: [["Veg", 215], ["Chicken", 255], ["Buff", 225]] }
          ]},
          { label: "Rolls & wontons", items: [
            { name: "Fried Spring Rolls", prices: [["Veg", 275], ["Corn Cream Cheese", 305], ["Chicken", 290]] },
            { name: "Fried Wonton", prices: [["Veg", 235], ["Chicken", 255], ["Prawn", 295], ["Pork", 255], ["Corn Cream Cheese", 285]] }
          ]}
        ]
      },
      {
        id: "sushi", label: "Sushi & baos", image: "images/sushi.webp",
        sub: [
          { label: "Sushi · veg (4 pc / 8 pc)", items: [
            { name: "Asparagus Tempura", prices: [["4 pc", 355], ["8 pc", 545]], veg: true },
            { name: "Tempura Yasai", prices: [["4 pc", 335], ["8 pc", 465]], veg: true, desc: "Asparagus, carrot, cucumber." },
            { name: "Hot Lava Roll", prices: [["4 pc", 335], ["8 pc", 465]], veg: true, desc: "Tofu, cucumber." },
            { name: "Sweet Crispy Shiitake Mushroom", prices: [["4 pc", 355], ["8 pc", 545]], veg: true },
            { name: "Crispy Veg Cheese Roll", prices: [["4 pc", 335], ["8 pc", 525]], veg: true },
            { name: "Mixed Veg Tempura", prices: [["4 pc", 335], ["8 pc", 465]], veg: true },
            { name: "Wongdhen Special Roll", prices: [["4 pc", 365], ["8 pc", 565]], veg: true, desc: "Cream cheese, tofu, cucumber, asparagus." }
          ]},
          { label: "Sushi · chicken & seafood (4 pc / 8 pc)", items: [
            { name: "Teriyaki Chicken", prices: [["4 pc", 365], ["8 pc", 560]], veg: false },
            { name: "Tiger Chicken Roll", prices: [["4 pc", 365], ["8 pc", 560]], veg: false },
            { name: "Prawn Tempura Roll", prices: [["4 pc", 405], ["8 pc", 625]], veg: false },
            { name: "Double Trouble Prawn", prices: [["4 pc", 405], ["8 pc", 625]], veg: false },
            { name: "Prawn Tempura with Crab Sticks", prices: [["4 pc", 405], ["8 pc", 625]], veg: false },
            { name: "Spicy Salmon", prices: [["4 pc", 425], ["8 pc", 645]], veg: false },
            { name: "Cream Cheese Salmon", prices: [["4 pc", 425], ["8 pc", 645]], veg: false },
            { name: "Smoky Salmon Hot Roll", prices: [["4 pc", 425], ["8 pc", 645]], veg: false },
            { name: "Spicy Tuna", prices: [["4 pc", 445], ["8 pc", 665]], veg: false },
            { name: "Red Dragon Roll", prices: [["4 pc", 445], ["8 pc", 665]], veg: false, desc: "Tuna & prawn." },
            { name: "Crab Tempura", prices: [["4 pc", 485], ["8 pc", 775]], veg: false },
            { name: "California Roll", prices: [["4 pc", 485], ["8 pc", 775]], veg: false, desc: "Asparagus, crab sticks." }
          ]},
          { label: "Sushi boat (20 pc)", items: [
            { name: "Sushi Boat", prices: [["Veg", 1200], ["Non-veg", 2000]] }
          ]},
          { label: "Baos", items: [
            { name: "Crispy Chilly Paneer", price: 335, veg: true },
            { name: "Crispy Mixed Vegetable", price: 335, veg: true },
            { name: "Chilly Chicken", price: 395, veg: false },
            { name: "Thai Tangy Chicken", price: 395, veg: false },
            { name: "Chilly Garlic Fish", price: 415, veg: false },
            { name: "Crispy Tangy Fish", price: 415, veg: false },
            { name: "Honey Pork Belly", price: 375, veg: false },
            { name: "Chilly Pork Bao", price: 375, veg: false }
          ]}
        ]
      },
      {
        id: "asian-soups", label: "Soups & appetizers",
        sub: [
          { label: "Soups", items: [
            { name: "Thukpa", prices: [["Veg", 205], ["Buff", 245], ["Chicken", 255]] },
            { name: "Burnt Garlic Soup", prices: [["Veg", 195], ["Chicken", 225]] },
            { name: "Manchow Soup", prices: [["Veg", 185], ["Chicken", 215]] },
            { name: "Classic Hot & Sour", prices: [["Veg", 185], ["Chicken", 215]] },
            { name: "Classic Sweet Corn Soup", prices: [["Veg", 185], ["Chicken", 215]] },
            { name: "Tom Yum", prices: [["Veg", 225], ["Chicken", 235], ["Prawn", 265]] },
            { name: "Korean Spicy Ramen", prices: [["Tofu", 325], ["Chicken", 345], ["Pork", 335]] },
            { name: "Khao Suey", prices: [["Veg", 315], ["Chicken", 345], ["Prawn", 375]], desc: "A coconut-milk-based Burmese noodle soup." }
          ]},
          { label: "Appetizers · veg", items: [
            { name: "Crispy Chilly", prices: [["Potato", 245], ["Lotus Stem", 275], ["Mushroom", 265]], veg: true, desc: "Add honey @10." },
            { name: "Crispy Veg Chilly Mountain", price: 265, veg: true },
            { name: "Classic Chilly Paneer", price: 275, veg: true },
            { name: "Salt & Pepper", prices: [["Veg", 315], ["Corn", 285], ["Mushroom", 305]], veg: true },
            { name: "Japanese Edamame", prices: [["Steam", 410], ["Chilly Garlic", 430]], veg: true },
            { name: "Thai Basil Lettuce Wraps", price: 285, veg: true }
          ]},
          { label: "Appetizers · chicken", items: [
            { name: "Thai Basil Chicken", price: 315, veg: false },
            { name: "Thai Basil Chicken Lettuce Wraps", price: 315, veg: false },
            { name: "Classic Chilly Chicken", price: 315, veg: false },
            { name: "Chilly Garlic Chicken Wings", price: 315, veg: false },
            { name: "Crispy Honey Chicken", price: 315, veg: false }
          ]},
          { label: "Appetizers · lamb, buff & pork", items: [
            { name: "Crispy Congee Lamb", price: 415, veg: false },
            { name: "Buff Chinese Cabbage", price: 255, veg: false },
            { name: "Crispy Chilly", prices: [["Lamb", 415], ["Buff", 255], ["Pork", 265]], veg: false },
            { name: "Sweet & Sour Pork", price: 265, veg: false },
            { name: "Double Fried Pork", price: 275, veg: false }
          ]},
          { label: "Seafood & duck", items: [
            { name: "Steam Fish", price: 455, veg: false, desc: "Chilly oyster / Thai basil / black pepper." },
            { name: "Crispy Fish", price: 455, veg: false, desc: "Black pepper / chilly bean / chilly hoisin / Thai sweet chilly." },
            { name: "Chilly Garlic Prawns", price: 535, veg: false },
            { name: "Prawn Tempura", price: 525, veg: false },
            { name: "Golden Fried Prawns", price: 525, veg: false },
            { name: "Crispy Chilly Pepper Crab / Butter Garlic Crab", price: 575, veg: false },
            { name: "Crispy Duck", price: 470, veg: false, desc: "In chilly oyster / black pepper / chilly garlic." },
            { name: "Peking Duck (full)", price: 1700, veg: false, desc: "Comes with pancakes, cucumber & leeks." }
          ]}
        ]
      },
      {
        id: "asian-mains", label: "Mains, rice & noodles",
        sub: [
          { label: "Main course · veg", items: [
            { name: "Asian Greens with Water Chestnut", price: 325, veg: true },
            { name: "Buddha's Delight", price: 335, veg: true, desc: "Asian vegetables with tofu." },
            { name: "Classic Chilly Paneer", price: 345, veg: true },
            { name: "Kung Pao Vegetable", price: 325, veg: true },
            { name: "Classic Vegetable Manchurian", price: 325, veg: true },
            { name: "Creamy Garlic Vegetables", price: 345, veg: true },
            { name: "Mapo Tofu", price: 345, veg: true, desc: "Tofu in spicy sauce." },
            { name: "Mixed Vegetable in Choice of Sauce", price: 335, veg: true, desc: "Black bean, hot garlic, sweet & sour, black pepper." }
          ]},
          { label: "Main course · non-veg", items: [
            { name: "Chicken Bamboo Shoot", price: 355, veg: false },
            { name: "Kung Pao Chicken", price: 375, veg: false },
            { name: "Chilly Chicken", price: 375, veg: false },
            { name: "Sliced Chicken in Choice of Sauce", price: 345, veg: false, desc: "Black bean, black pepper, Szechwan." },
            { name: "Shredded Lamb in Choice of Sauce", price: 455, veg: false, desc: "Hot garlic, chilly bean, black pepper." },
            { name: "Slice Fish in Choice of Sauce", price: 445, veg: false, desc: "Ginger wine, black pepper, Szechwan." },
            { name: "Prawn in Choice of Sauce", price: 575, veg: false, desc: "Creamy butter garlic, chilly garlic, XO sauce." },
            { name: "Squid in Choice of Sauce", price: 445, veg: false, desc: "Chilly garlic, butter garlic." },
            { name: "Duck in Choice of Sauce", price: 600, veg: false, desc: "Chilly hoisin, Szechwan." },
            { name: "Buff Shapta", price: 275, veg: false, desc: "Traditional Tibetan dish." },
            { name: "Mongolian Buff", price: 275, veg: false }
          ]},
          { label: "Asian meals", items: [
            { name: "Chinese Chop Suey", prices: [["Veg", 290], ["Chicken", 320], ["Prawn", 350], ["Pork", 330]], desc: "Mild garlic sauce." },
            { name: "American Chop Suey", prices: [["Veg", 290], ["Chicken", 320], ["Prawn", 350], ["Pork", 330]], desc: "Sweet & sour." },
            { name: "Pad Thai Noodles", prices: [["Veg", 300], ["Chicken", 320], ["Prawn", 340]] },
            { name: "Pan Fried Noodles", prices: [["Veg", 310], ["Chicken", 330], ["Prawn", 360]], desc: "Hot garlic, Szechwan or black bean." },
            { name: "Nasi Goreng", price: 380, veg: false },
            { name: "Thai Red Curry with Rice", prices: [["Veg", 360], ["Chicken", 380], ["Prawn", 580]] },
            { name: "Thai Green Curry with Rice", prices: [["Veg", 360], ["Chicken", 380], ["Prawn", 580]] },
            { name: "Thai Shrimp Rice", price: 330, veg: false }
          ]},
          { label: "Rice & noodles", items: [
            { name: "Fried Rice", prices: [["Veg", 225], ["Chicken", 285], ["Prawn", 315], ["Buff", 265], ["Pork", 275]], desc: "Add chilly garlic @10." },
            { name: "Hakka Noodles", prices: [["Veg", 235], ["Chicken", 275], ["Prawn", 305], ["Buff", 255], ["Pork", 275]], desc: "Add chilly garlic @10." },
            { name: "Butter Garlic Udon Noodles", price: 335 },
            { name: "Steam Rice", price: 195 },
            { name: "Butter Garlic Noodles with Black Pepper Sauce", price: 255 },
            { name: "Bok Choy Wrap", price: 285 },
            { name: "Dry Spicy Ramen Noodle", price: 315 }
          ]},
          { label: "Poke bowls", items: [
            { name: "Poke Bowl", prices: [["Edamame", 445], ["Chicken", 465], ["Prawn", 515], ["Salmon", 565], ["Tuna", 575], ["Mixed Seafood", 795]] }
          ]},
          { label: "Mongolian hot pot", items: [
            { name: "Vegetable Hot Pot", price: 775, veg: true },
            { name: "Chicken Hot Pot", price: 845, veg: false },
            { name: "Mixed Non-veg Hot Pot", price: 1200, veg: false, desc: "Chicken, buff, prawns & pork. Add extra egg @85 / noodles @75." }
          ]}
        ]
      }
    ]
  },
  {
    id: "continental", label: "Continental",
    groups: [
      {
        id: "pizza", label: "Wood-fired pizza", image: "images/dish-pizza.webp",
        note: "Dough fermented for 24 hours, baked in our wood-fired oven. Thin crust or classic Napoli (hand-tossed). Whole-wheat sourdough base +₹100 · extra cheese +₹80.",
        noteNoPrice: "Dough fermented for 24 hours, baked in our wood-fired oven. Thin crust or classic Napoli (hand-tossed); ask for a whole-wheat sourdough base or extra cheese.",
        sub: [
          { label: "Pizza · veg", items: [
            { name: "Margherita", price: 405, veg: true },
            { name: "4 Cheese Pizza", price: 450, veg: true, desc: "Yellow cheddar, mozzarella, white cheddar, parmesan." },
            { name: "Mexican Paneer Pizza", price: 440, veg: true },
            { name: "Pizza Primavera", price: 440, veg: true, desc: "Cherry tomatoes, sweet corn, black olives, spinach." },
            { name: "Pesto Rocket Pizza", price: 440, veg: true, desc: "Pesto paste, rocket leaves." },
            { name: "Exotic Mushroom", price: 440, veg: true },
            { name: "Wongdhen Creamy Pizza", price: 460, veg: true, spl: true, desc: "Butter, mozzarella, mushroom with sun-dried tomatoes." },
            { name: "Exotic Veg Pizza", price: 465, veg: true, desc: "Broccoli, bell pepper, onion, zucchini, black olives, jalapeño & mushroom." },
            { name: "Bocconcini Cheese Pizza", price: 480, veg: true },
            { name: "Burrata Cheese Pizza / Burrata Pesto Cheese Pizza", price: 600, veg: true }
          ]},
          { label: "Pizza · non-veg", items: [
            { name: "Garlic Chicken with Red Pimento Chilies", price: 475, veg: false },
            { name: "Chicken Tikka", price: 475, veg: false },
            { name: "Peri Peri Chicken", price: 475, veg: false },
            { name: "Pesto Chicken", price: 485, veg: false },
            { name: "BBQ Chicken", price: 475, veg: false },
            { name: "Loaded Chicken", price: 475, veg: false },
            { name: "Wongdhen Creamy Chicken & Mushroom", price: 505, veg: false, spl: true },
            { name: "Smoked Chicken with Bacon", price: 505, veg: false },
            { name: "Italian Pepperoni", price: 505, veg: false }
          ]}
        ]
      },
      {
        id: "pasta", label: "Pasta & mains", image: "images/spread-wide.webp",
        note: "All pastas come with a side of garlic bread. Choose penne, spaghetti or farfalle.",
        sub: [
          { label: "Pasta", items: [
            { name: "Arrabbiata", prices: [["Veg", 345], ["Chicken", 405]], desc: "Garlic, tomatoes, dried & red chilli peppers cooked in olive oil." },
            { name: "Alfredo (White Sauce)", prices: [["Veg", 345], ["Chicken", 405]] },
            { name: "Pink Sauce", prices: [["Veg", 345], ["Chicken", 405]], desc: "Mix of white & red sauce with cream." },
            { name: "Alio Olio", prices: [["Veg", 325], ["Chicken", 395]], desc: "Garlic & oil with chilli flakes." },
            { name: "Vodka Sauce", prices: [["Veg", 365], ["Chicken", 435]], spl: true, desc: "Our special sauce: red & white, with a little vodka & cream." },
            { name: "Mac & Cheese", prices: [["Veg", 345], ["Chicken", 405]] },
            { name: "Spaghetti Carbonara (Pork)", price: 435, veg: false, spl: true },
            { name: "Bolognese (Lamb)", price: 395, veg: false, desc: "Meat sauce with minced lamb." },
            { name: "Pesto Cream", prices: [["Veg", 435], ["Chicken", 465]] },
            { name: "Lasagna", prices: [["Veg", 430], ["Chicken", 480]] }
          ]},
          { label: "Mains", items: [
            { name: "Grilled Cottage Cheese with Sautéed Vegetables", price: 365, veg: true },
            { name: "Chicken Roulade", price: 405, veg: false },
            { name: "Lemon Thyme Grilled Chicken, Mash Potatoes & Homemade Jus", price: 405, veg: false },
            { name: "Creamy Cashew Chicken with Rice", price: 405, veg: false },
            { name: "BBQ Pork Ribs with Corn Bread", price: 475, veg: false },
            { name: "Crumb Fried Fish N Chips with Tartar Sauce", price: 465, veg: false },
            { name: "Grilled Fish with Lemon Butter Sauce", price: 465, veg: false },
            { name: "Moroccan Lamb with Herb Pilaf", price: 475, veg: false },
            { name: "Burrito Rice Meal Bowl", prices: [["Fajita Cottage Cheese", 425], ["Fajita Chicken", 445]] },
            { name: "Buff Tenderloin Steak with Mash Potato & Grilled Vegetables", price: 470, veg: false }
          ]}
        ]
      },
      {
        id: "starters", label: "Soups, salads & starters", image: "images/dish-burger.webp",
        sub: [
          { label: "Soups (veg)", items: [
            { name: "Pumpkin & Kaffir Lime", price: 205, veg: true },
            { name: "Tomato Cream & Sour", price: 205, veg: true },
            { name: "Creamy Mushroom Soup in a Multigrain Loaf", price: 315, veg: true }
          ]},
          { label: "Salads (add grilled chicken @80)", items: [
            { name: "Caesar Salad", price: 215, desc: "Iceberg lettuce, Fresho lettuce, croutons, cherry tomatoes." },
            { name: "Greek Salad", price: 215, veg: true, desc: "Bell peppers, cucumber, cherry tomatoes, citrus dressing, iceberg lettuce." },
            { name: "Grilled Vegetarian Salad", price: 215, veg: true }
          ]},
          { label: "Appetizers · veg", items: [
            { name: "Hummus & Pita", price: 215, veg: true },
            { name: "Hummus & Pita with Broccoli & Mushroom", price: 245, veg: true },
            { name: "Peri Peri Baby Potatoes", price: 250, veg: true },
            { name: "Cheesy Baked Nachos", price: 250, veg: true, spl: true },
            { name: "Cheesy Mozzarella Sticks", price: 250, veg: true },
            { name: "Chilli Cheese Toasties", price: 230, veg: true },
            { name: "Classic Fries", price: 240, veg: true },
            { name: "Peri Peri Fries", price: 240, veg: true },
            { name: "Truffle Parmesan Fries", price: 315, veg: true },
            { name: "Loaded Cheesy Fries", price: 255, veg: true },
            { name: "Falafel Bites with Tzatziki Dip", price: 250, veg: true },
            { name: "Hand Stretched Garlic Breads", prices: [["Herb Butter", 215], ["Herb Butter & Cheese", 240]], veg: true },
            { name: "V-Crispers", prices: [["Classic", 245], ["Peri Peri", 275], ["Cheese", 305]], veg: true },
            { name: "Cream Cheese Avocado Toast", price: 310, veg: true }
          ]},
          { label: "Appetizers · non-veg", items: [
            { name: "Lebanese Chicken Hummus & Pita", price: 300, veg: false },
            { name: "Parmesan Chicken Tenders with Cilantro Pesto", price: 300, veg: false, spl: true },
            { name: "Chicken Wings", price: 270, veg: false, desc: "Honey mustard / spiced BBQ." },
            { name: "Texas BBQ Prawns", price: 500, veg: false },
            { name: "Chicken Nachos", price: 300, veg: false },
            { name: "Hand Stretched Garlic Breads", price: 255, veg: false, spl: true, desc: "Cheese & chicken / cheese & pepperoni." },
            { name: "Hummus & Pita (Grilled Chicken & Mushroom)", price: 255, veg: false },
            { name: "Smoked Salmon Avocado Cream Cheese Toast", price: 315, veg: false }
          ]}
        ]
      },
      {
        id: "sandwiches", label: "Burgers & sandwiches", image: "images/dish-croissant.webp",
        note: "Extra cheese slice @70 · bacon (2 pc) @100. Baguette sandwiches come with fries & salad.",
        noteNoPrice: "Add an extra cheese slice or bacon to any of them. Baguette sandwiches come with fries & salad.",
        sub: [
          { label: "Burgers, sandwiches & wraps", items: [
            { name: "Club Sandwich", prices: [["Veg", 315], ["Chicken", 355]] },
            { name: "Falafel Wrap", price: 305, veg: true },
            { name: "The Ultimate Burger", price: 355, veg: true },
            { name: "Pesto Grilled Vegetables Italian Sandwich", price: 335, veg: true },
            { name: "Pesto Italian Sandwich (Chicken)", price: 455, veg: false },
            { name: "Italian Pepperoni Sandwich", price: 470, veg: false },
            { name: "Garlic Wrap (Chicken)", price: 355, veg: false },
            { name: "Butter Milk Crunchy Burger (Chicken)", price: 385, veg: false },
            { name: "BBQ Burger (Chicken)", price: 385, veg: false },
            { name: "Smashed Burger", prices: [["Buff", 385], ["Chicken", 395], ["Lamb", 415]], veg: false },
            { name: "Minced Cottage Cheese Burger", price: 385, veg: true }
          ]},
          { label: "Korean milk bread sandwiches", items: [
            { name: "Crispy Potato Korean Sandwich", price: 315, veg: true },
            { name: "Grilled Cheese Korean Sandwich", price: 305, veg: true },
            { name: "Cheesy Egg with Chicken Ham Sandwich", price: 325, veg: false },
            { name: "Fried Chicken Sandwich with Lettuce", price: 350, veg: false },
            { name: "Crispy Fish with Tartar Sauce & Coleslaw Sandwich", price: 370, veg: false }
          ]},
          { label: "Toasted baguette sandwiches", items: [
            { name: "Mushroom Baguette Sandwich", price: 315, veg: true },
            { name: "Crispy Paneer Baguette Sandwich", price: 340, veg: true },
            { name: "Pulled Chicken Baguette Sandwich", price: 360, veg: false },
            { name: "Fried Fish Baguette Sandwich", price: 390, veg: false }
          ]},
          { label: "Dips", items: [
            { name: "Any dip", price: 30, desc: "Mayo, garlic mayo, sriracha mayo, cilantro pesto, basil pesto, homemade salsa, sour cream, tartar, tzatziki." }
          ]}
        ]
      }
    ]
  },
  {
    id: "desserts", label: "Desserts & bakery",
    groups: [
      {
        id: "cakes", label: "Cakes & cheesecakes", image: "images/cheesecakes.webp",
        sub: [
          { label: "Desserts", items: [
            { name: "Tiramisu Cake", price: 210 },
            { name: "Brownie with Ice Cream", price: 200 },
            { name: "Blueberry Cheesecake", price: 200 },
            { name: "Japanese Cheesecake Cake", price: 205 },
            { name: "Oreo Cheesecake (Eggless)", price: 180, veg: true },
            { name: "Biscoff Cheesecake (Eggless)", price: 220, veg: true },
            { name: "Basque Cheesecake", price: 250 },
            { name: "Matcha Cheesecake", price: 250 },
            { name: "Apple Crumble", price: 170 },
            { name: "Apple Crumble with Ice Cream (Eggless)", price: 200, veg: true },
            { name: "Banoffee Pie (Eggless)", price: 180, veg: true },
            { name: "Red Velvet Cake (Eggless)", price: 195, veg: true },
            { name: "Truffle Chocolate Apricot Cake", price: 200 },
            { name: "Walnut Brownie", price: 170 },
            { name: "Mud Cake", price: 180 }
          ]},
          { label: "Asian dessert", items: [
            { name: "Darsan with Ice Cream", price: 215, desc: "Fried crispy honey noodles with sesame seeds and vanilla ice cream." }
          ]}
        ]
      },
      {
        id: "bakery", label: "From the bakery", image: "images/tiramisu.webp",
        note: "Fresh every day. Ask at the counter for today's breads (sourdough, baguette and more) to take home.",
        sub: [
          { label: "Pastries & doughnuts", items: [
            { name: "Macaron", price: 100, desc: "Strawberry / chocolate / blueberry." },
            { name: "Butter Croissant", price: 95 },
            { name: "Chocolate Croissant", price: 105 },
            { name: "Almond Croissant", price: 105 },
            { name: "Blueberry Doughnut", price: 110 },
            { name: "Cream Doughnut", price: 115 },
            { name: "Chocolate Doughnut", price: 110 },
            { name: "Strawberry Doughnut", price: 115 },
            { name: "Sugar Doughnut", price: 105 },
            { name: "Éclair", price: 119, desc: "Chocolate / vanilla." },
            { name: "Cup Cake", price: 95, desc: "Chocolate / vanilla." }
          ]}
        ]
      }
    ]
  },
  {
    id: "drinks", label: "Drinks",
    groups: [
      {
        id: "coffee", label: "Coffee", image: "images/latte.webp",
        note: "Add a flavour @30: hazelnut, vanilla, caramel or tiramisu.",
        noteNoPrice: "Add a flavour: hazelnut, vanilla, caramel or tiramisu.",
        sub: [
          { label: "Hot coffee", items: [
            { name: "Espresso", prices: [["Single", 130], ["Double", 180]] },
            { name: "Cappuccino", price: 210 },
            { name: "Flat White", price: 210 },
            { name: "Americano", price: 190 },
            { name: "Caffè Mocha", price: 220 },
            { name: "Pour Over", price: 190 },
            { name: "Caffè Latte", price: 210 },
            { name: "Caffè Macchiato", price: 210 }
          ]},
          { label: "Iced coffee", items: [
            { name: "Ice Americano", price: 190 },
            { name: "Ice Latte", price: 235 },
            { name: "Ice Mocha", price: 235 },
            { name: "Ice Orange Mocha", price: 235 },
            { name: "Vietnamese Coffee", price: 225 },
            { name: "Ice Pour Over", price: 190 },
            { name: "Ice Macchiato", price: 235 }
          ]},
          { label: "Ice blend frappé", items: [
            { name: "Wongdhen Frozen Cold Coffee", price: 235 },
            { name: "Choco Chip Frappe", price: 260 },
            { name: "Caramel Frappe", price: 260 },
            { name: "Tiramisu Frappe", price: 260 },
            { name: "Hazelnut Frappe", price: 260 },
            { name: "Oreo Frappe", price: 270 },
            { name: "Strawberry Frappe", price: 260 }
          ]},
          { label: "Coffee-free hot drinks", items: [
            { name: "Hot Chocolate", price: 225 }
          ]}
        ]
      },
      {
        id: "tea", label: "Tea & bubble tea",
        sub: [
          { label: "Hot tea", items: [
            { name: "English Breakfast Tea", price: 115 },
            { name: "Ginger Honey Lemon Tea", price: 110 },
            { name: "Green Tea", price: 115 },
            { name: "Hibiscus Herbal Tea", price: 125 },
            { name: "Masala Chai", price: 125 },
            { name: "Chamomile Tea", price: 150 },
            { name: "Matcha Tea", price: 190 }
          ]},
          { label: "Iced tea", items: [
            { name: "Hibiscus & Passion Fruit Lemonade", price: 215 },
            { name: "Hibiscus & Mint Tea", price: 215 },
            { name: "Peach Ice Tea", price: 215 },
            { name: "Classic Lemon Ice Tea", price: 215 },
            { name: "Mango Ice Tea", price: 215 },
            { name: "Ice Matcha Tea", price: 210 }
          ]},
          { label: "Bubble tea", items: [
            { name: "Taro Love Bubble Tea", price: 230 },
            { name: "Salted Caramel Bubble Tea", price: 230 },
            { name: "Matcha Bubble Tea", price: 230 },
            { name: "Silky Strawberry Bubble Tea", price: 230 },
            { name: "Brown Sugar Bubble Tea", price: 230 },
            { name: "Coffee Bubble Tea", price: 230 }
          ]},
          { label: "Kombucha", items: [
            { name: "Mint Lime", price: 240 },
            { name: "Ginger Lemon", price: 240 },
            { name: "Apple Cinnamon", price: 240 }
          ]}
        ]
      },
      {
        id: "coolers", label: "Shakes, mocktails & more", image: "images/mojitos.webp",
        sub: [
          { label: "Shakes (extra scoop of ice cream @40)", items: [
            { name: "Strawberry Cream Shake", price: 275 },
            { name: "Choco Chip Shake", price: 275 },
            { name: "Mango Madness Shake", price: 275 },
            { name: "Chocolate Brownie Shake", price: 295 },
            { name: "Lotus Biscoff Shake", price: 295 },
            { name: "Oreo Shake", price: 295 },
            { name: "Banana Shake", price: 250 },
            { name: "Blueberry Shake", price: 275 },
            { name: "Vanilla Shake", price: 275 }
          ]},
          { label: "Mocktails & aerated drinks", items: [
            { name: "Classic Mojito", price: 210 },
            { name: "Green Apple / Mint Mojito", price: 250 },
            { name: "Wongdhen Signature Mojito", price: 275 },
            { name: "Unicorn Lemonade", price: 275 },
            { name: "Pineapple Sunrise Punch", price: 275 },
            { name: "Watermelon Basil Cooler", price: 275 },
            { name: "Orange & Kaffir Lime Paloma", price: 275 },
            { name: "Mulled Cold Non-Alcoholic Sangria", price: 275 },
            { name: "Summer Cooler", price: 305 },
            { name: "Fresh Lime", price: 160, desc: "Sweet / salt / mix." },
            { name: "Fresh Lime Soda", price: 180, desc: "Sweet / salt / mix." },
            { name: "Coke / Fanta / Sprite", price: 60 },
            { name: "Diet Coke", price: 70 },
            { name: "Apple Beer (soft drink)", price: 70 },
            { name: "Water", price: 30 }
          ]},
          { label: "Smoothies (curd mix)", items: [
            { name: "Banana Mixed Berries Smoothie", price: 225 },
            { name: "Mango Madness Smoothie", price: 225 },
            { name: "Tropical Fruit Smoothie", price: 225 },
            { name: "Passion Fruit & Cucumber Smoothie", price: 225 },
            { name: "Blueberry Smoothie", price: 225 }
          ]},
          { label: "Fresh juice & slush", items: [
            { name: "Mix Fruit Juice", price: 225 },
            { name: "Orange Juice", price: 215 },
            { name: "Watermelon Juice", price: 215 },
            { name: "Punky Pulse Slush", price: 265 },
            { name: "Watermelon Slush", price: 265 },
            { name: "Mango Slush", price: 265 }
          ]}
        ]
      }
    ]
  }
];
