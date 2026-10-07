/* ==========================================================================
   Wongdhen Cafe — menu (feeds menu.html)
   --------------------------------------------------------------------------
   PRICES: from the menu on Wongdhen Cafe's Google Business Profile
   ("See full menu", labelled "Provided by Zomato"), read 7 Oct 2026.
   Copy kept in brief/sources/google/menu-google-2026-10-07.txt.
   Dishes come from Google's menu plus the café's printed menu (Zomato, June
   2025). A dish only on the printed menu is listed without a price.
   Left off on purpose: wine and soju (on Google's list, not confirmed by
   the owner) and add-ons, which are folded into the notes.

   Format
   • price: 445              → one price
   • price: 445, from: true  → "from ₹445" (Google gives one price for a dish
                               that comes in several options)
   • prices: [["Chicken",550],["Lamb",570],["Buff",null]] → priced options
   • options: ["Veg","Chicken"] → options without their own price
   • no price                → listed by name only
   • veg: true / false       → green / red mark (omitted when mixed)
   • spl: true               → chef's special (chef hat on the printed menu)

   Veg / Non-veg filter (the toggle on menu.html)
   • "Veg" shows dishes with veg: true, "Non-veg" dishes with veg: false.
   • A dish without veg whose options include both kinds ("Veg", "Tofu",
     "Cottage Cheese"… and "Chicken", "Prawn", "Pork"…) shows in both, with
     just the matching options. The words are listed in js/main.js.
   • Any other dish without veg (egg dishes, most cakes) shows under neither:
     give it veg: true / false to put it in one.
   • unfiltered: true (on a section) → the filter leaves it whole (drinks).
   ========================================================================== */
window.WONGDHEN_MENU = [
  {
    id: "breakfast", label: "Breakfast",
    groups: [
      {
        id: "set-breakfasts", label: "Set breakfasts", image: "images/breakfast-sets.webp",
        note: "Served 8 am – 12 noon. Each set comes with a coffee (hot or iced) or a tea.",
        sub: [
          { label: "Set breakfasts", items: [
            { name: "Classic Vegetarian European Breakfast", price: 415, veg: true, desc: "Toast, baked beans, mushrooms, potato griddle, sautéed paneer & veggies." },
            { name: "Vegetarian Himalayan Breakfast", price: 415, veg: true, desc: "Two parathas, aloo dum, yogurt & red chutney." },
            { name: "Non-veg American Breakfast", price: 485, veg: false, desc: "Pancakes, potato griddle, two eggs, chicken sausage & bacon with maple syrup." },
            { name: "Non-veg European Breakfast", price: 485, veg: false, desc: "Toast, baked beans, two chicken sausages & two eggs your way." }
          ]},
          { label: "Egg specials", items: [
            { name: "Egg Benedict", price: 450, desc: "Poached eggs on brioche with hollandaise, potato griddle & salad." },
            { name: "Turkish Eggs", price: 450, desc: "Poached eggs over garlic yogurt with paprika butter & sourdough." },
            { name: "Hot Chilli Cheesy Sunny-Side Eggs", price: 450, desc: "Spicy cheesy eggs with sourdough." },
            { name: "Hot Honey Fried Eggs", price: 450, desc: "Crispy fried eggs glazed with hot honey." },
            { name: "3-Egg Omelette", options: ["Plain", "Masala", "Cheese"], desc: "Served with sourdough toast & potato griddle." }
          ]},
          { label: "Burritos", items: [
            { name: "Mushroom & Cottage Cheese Burrito", price: 450, veg: true },
            { name: "Scrambled Egg Burrito", price: 460 },
            { name: "Chicken Ham Egg Burrito", price: 490, veg: false }
          ]}
        ]
      },
      {
        id: "toasts", label: "Sandwiches & toasts", image: "images/dish-croissant.webp",
        sub: [
          { label: "Breakfast sandwiches", items: [
            { name: "Mushroom Croissant Sandwich", price: 405, veg: true },
            { name: "Egg Croissant Sandwich", price: 405 },
            { name: "Egg & Chicken Ham Croissant Sandwich", price: 445, veg: false },
            { name: "Japanese Egg Sando", price: 415 },
            { name: "Cottage Cheese Akuri Sandwich", price: 405, veg: true },
            { name: "Cream Cheese Sourdough Toast", price: 425, veg: true },
            { name: "Chicken Ham & Cheese Melt Sandwich", price: 445, veg: false }
          ]},
          { label: "Open toasts", items: [
            { name: "Avocado Sourdough Toast", price: 450 },
            { name: "Chilli Fried Egg Avocado Toast", price: 485 },
            { name: "Boiled Egg Avocado Toast", price: 480 },
            { name: "Sunny-Side Avocado Toast", price: 480 }
          ]}
        ]
      },
      {
        id: "pancakes", label: "Pancakes & French toast", image: "images/dish-tiramisu-toast.webp",
        sub: [
          { label: "Pancakes", items: [
            { name: "Plain Pancakes", price: 400 },
            { name: "Banana Pancakes", price: 415 },
            { name: "Nutella Pancakes", price: 415 },
            { name: "Chocolate Pancakes", price: 415 },
            { name: "Peanut Butter & Jelly Pancakes", price: 440 },
            { name: "Lotus Biscoff Pancakes", price: 440 },
            { name: "Tiramisu Pancakes", price: 505 },
            { name: "Matchamisu Pancakes", price: 505 }
          ]},
          { label: "French toast & waffles", items: [
            { name: "Plain French Toast", price: 385 },
            { name: "Nutella French Toast", price: 415 },
            { name: "Tiramisu French Toast", price: 505, desc: "Soft, indulgent and topped with creamy tiramisu." },
            { name: "Waffle", prices: [["Nutella", 425], ["Plain", null], ["Banana", null]] }
          ]},
          { label: "Sides", items: [
            { name: "House Potato Griddle", price: 190, veg: true },
            { name: "Grilled Veggies", price: 210, veg: true },
            { name: "Mash Potato", price: 235, veg: true },
            { name: "Masala Pilaf Rice", price: 250, veg: true },
            { name: "Carrot Pilaf Rice", veg: true },
            { name: "Corn Bread" }
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
            { name: "Shanghai Crystal Dumplings", price: 430, veg: true },
            { name: "Veg Kaffir Lime Dumplings", price: 430, veg: true },
            { name: "Spinach Tofu Dumplings", price: 460, veg: true },
            { name: "Corn Cream Dumplings", veg: true }
          ]},
          { label: "Crystal dumplings · chicken (4 pc)", items: [
            { name: "Chicken Chilly Oil Dumplings", price: 470, veg: false },
            { name: "Water Chestnut Chicken Dumplings", price: 470, veg: false },
            { name: "Spicy Basil Chicken Dumplings", veg: false },
            { name: "Fiery Chicken Dumplings", veg: false },
            { name: "Truffle Oil Dumplings", veg: false },
            { name: "Burnt Garlic Cashew Nut", veg: false }
          ]},
          { label: "Crystal dumplings · prawn (4 pc)", items: [
            { name: "Spicy Prawn Dumplings", price: 490, veg: false },
            { name: "Prawn Har Gow Dumplings", price: 490, veg: false },
            { name: "Prawn Truffle Oil Dumplings", price: 500, veg: false },
            { name: "Prawn Rainbow Dumplings", veg: false }
          ]},
          { label: "Shumai · open dumplings", items: [
            { name: "Shumai", options: ["Veg", "Chicken", "Prawn", "4 pc or 8 pc"] }
          ]},
          { label: "Momos & dimsum", items: [
            { name: "Steam Momos", price: 350, from: true, options: ["Mixed Veg", "Chicken", "Buff", "Pork"] },
            { name: "Pan Fried Momos", price: 365, from: true, options: ["Mixed Veg", "Chicken", "Buff", "Pork"] },
            { name: "Deep Fried Momos", price: 365, from: true, options: ["Mixed Veg", "Chicken", "Buff", "Pork"] },
            { name: "Veg Szechwan Dimsum", price: 330, veg: true },
            { name: "Corn Spring Onion Dimsum", price: 330, veg: true },
            { name: "Mushroom Dimsum", price: 340, veg: true },
            { name: "Paneer Dimsum", veg: true },
            { name: "Creamy Garlic Dimsum", options: ["Veg", "Chicken", "Buff"] },
            { name: "Tibetan Shabalay (2 pc)", price: 370, from: true, options: ["Veg", "Chicken", "Buff"] },
            { name: "Tingmo (1 pc)", price: 185, veg: true, desc: "Tibetan steamed bread." }
          ]},
          { label: "Rolls & wontons", items: [
            { name: "Fried Spring Rolls", options: ["Veg", "Corn Cream Cheese", "Chicken"] },
            { name: "Fried Wonton", options: ["Veg", "Chicken", "Prawn", "Pork", "Corn Cream Cheese"] }
          ]}
        ]
      },
      {
        id: "sushi", label: "Sushi & poke", image: "images/sushi.webp",
        sub: [
          { label: "Sushi", items: [
            { name: "Spicy Tuna", price: 590, from: true, veg: false, options: ["4 pc", "8 pc"] },
            { name: "Red Dragon Roll", price: 590, from: true, veg: false, options: ["4 pc", "8 pc"], desc: "Tuna & prawn." },
            { name: "Double Trouble Prawn", price: 550, from: true, veg: false, options: ["4 pc", "8 pc"] },
            { name: "Prawn Tempura with Crab Sticks", price: 550, from: true, veg: false, options: ["4 pc", "8 pc"] },
            { name: "Wongdhen Special Roll", veg: true, desc: "Cream cheese, tofu, cucumber, asparagus." },
            { name: "Asparagus Tempura", veg: true },
            { name: "Tempura Yasai", veg: true, desc: "Asparagus, carrot, cucumber." },
            { name: "Hot Lava Roll", veg: true, desc: "Tofu, cucumber." },
            { name: "Sweet Crispy Shiitake Mushroom", veg: true },
            { name: "Crispy Veg Cheese Roll", veg: true },
            { name: "Mixed Veg Tempura", veg: true },
            { name: "Teriyaki Chicken", veg: false },
            { name: "Tiger Chicken Roll", veg: false },
            { name: "Prawn Tempura Roll", veg: false },
            { name: "Spicy Salmon", veg: false },
            { name: "Cream Cheese Salmon", veg: false },
            { name: "Smoky Salmon Hot Roll", veg: false },
            { name: "Crab Tempura", veg: false },
            { name: "California Roll", veg: false, desc: "Asparagus, crab sticks." }
          ]},
          { label: "Sushi boat (20 pc)", items: [
            { name: "Sushi Boat", prices: [["Veg", 1500], ["Non-veg", 2145]] }
          ]},
          { label: "Poke bowls", items: [
            { name: "Poke Bowl", prices: [["Prawn", 660], ["Salmon", 710], ["Tuna", 720], ["Mixed Seafood", 940], ["Edamame", null], ["Chicken", null]] }
          ]},
          { label: "Baos", items: [
            { name: "Crispy Chilly Paneer", veg: true },
            { name: "Crispy Mixed Vegetable", veg: true },
            { name: "Chilly Chicken", veg: false },
            { name: "Thai Tangy Chicken", veg: false },
            { name: "Chilly Garlic Fish", veg: false },
            { name: "Crispy Tangy Fish", veg: false },
            { name: "Honey Pork Belly", veg: false },
            { name: "Chilly Pork Bao", veg: false }
          ]}
        ]
      },
      {
        id: "asian-soups", label: "Soups & appetizers",
        sub: [
          { label: "Soups", items: [
            { name: "Thukpa", price: 350, from: true, options: ["Veg", "Buff", "Chicken"] },
            { name: "Burnt Garlic Soup", price: 340, from: true, options: ["Veg", "Chicken"] },
            { name: "Manchow Soup", price: 330, from: true, options: ["Veg", "Chicken"] },
            { name: "Classic Hot & Sour", price: 330, from: true, options: ["Veg", "Chicken"] },
            { name: "Classic Sweet Corn Soup", price: 330, from: true, options: ["Veg", "Chicken"] },
            { name: "Talumein Soup", price: 330, veg: true },
            { name: "Tom Yum", price: 370, from: true, options: ["Veg", "Chicken", "Prawn"] },
            { name: "Khao Suey", price: 460, from: true, options: ["Veg", "Chicken", "Prawn"], desc: "A coconut-milk-based Burmese noodle soup." },
            { name: "Korean Spicy Ramen", price: 470, from: true, options: ["Tofu", "Chicken", "Pork"] }
          ]},
          { label: "Appetizers · veg", items: [
            { name: "Crispy Chilly", price: 390, from: true, veg: true, options: ["Potato", "Lotus Stem", "Mushroom"] },
            { name: "Classic Chilly Paneer (dry)", price: 420, veg: true },
            { name: "Thai Basil Lettuce Wraps", price: 420, veg: true },
            { name: "Salt & Pepper", price: 430, from: true, veg: true, options: ["Veg", "Corn", "Mushroom"] },
            { name: "Steam Rice Paper Roll", price: 450, veg: true },
            { name: "Fried Sushi Burger", price: 540, veg: true },
            { name: "Japanese Edamame", price: 555, from: true, veg: true, options: ["Steam", "Chilly Garlic"] },
            { name: "Crispy Veg Chilly Mountain", veg: true }
          ]},
          { label: "Appetizers · chicken", items: [
            { name: "Chilly Garlic Chicken Wings", price: 460, veg: false, desc: "6 pieces." },
            { name: "Crispy Honey Chicken", price: 460, veg: false },
            { name: "Classic Chilly Chicken (dry)", price: 460, veg: false },
            { name: "Sesame Chicken", price: 460, veg: false },
            { name: "Drums of Heaven with Hot Garlic", price: 460, veg: false },
            { name: "Chicken Salt & Pepper", price: 460, veg: false },
            { name: "Thai Basil Chicken Lettuce Wraps", price: 460, veg: false, desc: "9 lettuce cups with minced chicken sautéed with basil." },
            { name: "Crispy Chicken in Hot Garlic Sauce", price: 490, veg: false },
            { name: "Korean Chicken Wings", price: 515, veg: false },
            { name: "Thai Basil Chicken", veg: false }
          ]},
          { label: "Appetizers · lamb, buff & pork", items: [
            { name: "Crispy Chilly", price: 370, from: true, veg: false, options: ["Lamb", "Buff", "Pork"] },
            { name: "Buff Chinese Cabbage", price: 400, veg: false, desc: "Deep-fried buff stir-fried with Chinese cabbage & bok choy; spicy and sour." },
            { name: "Sweet & Sour Pork", price: 410, veg: false },
            { name: "Double Fried Pork", price: 420, veg: false },
            { name: "Tibetan Fried Sausage", price: 445, veg: false },
            { name: "Crispy Congee Lamb", price: 570, veg: false, desc: "Shredded deep-fried lamb with oyster and celery, topped with fried wontons." }
          ]},
          { label: "Seafood & duck", items: [
            { name: "Steam Fish", price: 600, veg: false, desc: "Chilly oyster / Thai basil / black pepper." },
            { name: "Crispy Fish", price: 600, veg: false, desc: "Black pepper / chilly bean / chilly hoisin / Thai sweet chilly." },
            { name: "Golden Fried Prawns", price: 670, veg: false },
            { name: "Chilly Garlic Prawns", price: 680, veg: false },
            { name: "Prawn Tempura", veg: false },
            { name: "Crispy Chilly Pepper Crab / Butter Garlic Crab", veg: false },
            { name: "Crispy Duck", veg: false, desc: "In chilly oyster / black pepper / chilly garlic." },
            { name: "Peking Duck (full)", veg: false, desc: "Comes with pancakes, cucumber & leeks." }
          ]}
        ]
      },
      {
        id: "asian-mains", label: "Mains, rice & noodles",
        sub: [
          { label: "Main course · veg", items: [
            { name: "Asian Greens with Water Chestnut", price: 470, veg: true },
            { name: "Kung Pao Vegetable", price: 470, veg: true },
            { name: "Classic Vegetable Manchurian", price: 470, veg: true },
            { name: "Mixed Vegetable in Choice of Sauce", price: 480, veg: true, desc: "Black bean, hot garlic, sweet & sour, black pepper." },
            { name: "Classic Chilly Paneer (gravy)", price: 490, veg: true },
            { name: "Creamy Garlic Vegetables", price: 490, veg: true },
            { name: "Ema Datshi", price: 525, veg: true, desc: "Bhutanese chilli & cheese." },
            { name: "Buddha's Delight", veg: true, desc: "Asian vegetables with tofu." },
            { name: "Mapo Tofu", veg: true, desc: "Tofu in spicy sauce." }
          ]},
          { label: "Main course · non-veg", items: [
            { name: "Mongolian Buff", price: 420, veg: false },
            { name: "Sliced Chicken in Choice of Sauce", price: 490, veg: false, desc: "Black bean, black pepper, Szechwan." },
            { name: "Chicken Bamboo Shoot", price: 500, veg: false },
            { name: "Kung Pao Chicken", price: 535, veg: false },
            { name: "Sliced Fish in Choice of Sauce", price: 590, veg: false, desc: "Ginger wine, black pepper, Szechwan." },
            { name: "Shredded Lamb in Choice of Sauce", price: 600, veg: false, desc: "Hot garlic, chilly bean, black pepper." },
            { name: "Singaporean Chilli Prawns", price: 690, veg: false },
            { name: "Chilly Chicken", veg: false },
            { name: "Prawn in Choice of Sauce", veg: false, desc: "Creamy butter garlic, chilly garlic, XO sauce." },
            { name: "Squid in Choice of Sauce", veg: false, desc: "Chilly garlic, butter garlic." },
            { name: "Duck in Choice of Sauce", veg: false, desc: "Chilly hoisin, Szechwan." },
            { name: "Buff Shapta", veg: false, desc: "Traditional Tibetan dish." }
          ]},
          { label: "Asian meals", items: [
            { name: "American Chop Suey", price: 435, from: true, options: ["Veg", "Chicken", "Prawn", "Pork"], desc: "Sweet & sour." },
            { name: "Pad Thai Noodles", price: 445, from: true, options: ["Veg", "Chicken", "Prawn"] },
            { name: "Pan Fried Noodles", price: 455, from: true, options: ["Veg", "Chicken", "Prawn"], desc: "Hot garlic, Szechwan or black bean." },
            { name: "Thai Shrimp Rice", price: 475, veg: false },
            { name: "Thai Red Curry with Rice", price: 555, from: true, options: ["Veg", "Chicken", "Prawn"] },
            { name: "Thai Green Curry with Rice", price: 555, from: true, options: ["Veg", "Chicken", "Prawn"] },
            { name: "Chinese Chop Suey", options: ["Veg", "Chicken", "Prawn", "Pork"], desc: "Mild garlic sauce." },
            { name: "Nasi Goreng", veg: false }
          ]},
          { label: "Rice & noodles", items: [
            { name: "Steam Rice", price: 340, veg: true },
            { name: "Fried Rice", price: 370, from: true, options: ["Veg", "Chicken", "Prawn", "Buff", "Pork"] },
            { name: "Hakka Noodles", options: ["Veg", "Chicken", "Prawn", "Buff", "Pork"] },
            { name: "Butter Garlic Udon Noodles" },
            { name: "Butter Garlic Noodles with Black Pepper Sauce" },
            { name: "Bok Choy Wrap" },
            { name: "Dry Spicy Ramen Noodle" }
          ]},
          { label: "Mongolian hot pot", items: [
            { name: "Mongolian Hot Pot", options: ["Vegetable", "Chicken", "Mixed non-veg (chicken, buff, prawns & pork)"] }
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
        note: "Dough fermented for 24 hours, baked in our wood-fired oven. Thin crust or classic Napoli (hand-tossed). Extra cheese ₹180.",
        sub: [
          { label: "Pizza · veg", items: [
            { name: "Hot Chilly Margherita", price: 605, veg: true },
            { name: "Margherita", veg: true },
            { name: "4 Cheese Pizza", veg: true, desc: "Yellow cheddar, mozzarella, white cheddar, parmesan." },
            { name: "Mexican Paneer Pizza", veg: true },
            { name: "Pizza Primavera", veg: true, desc: "Cherry tomatoes, sweet corn, black olives, spinach." },
            { name: "Pesto Rocket Pizza", veg: true, desc: "Pesto paste, rocket leaves." },
            { name: "Exotic Mushroom", veg: true },
            { name: "Wongdhen Creamy Pizza", veg: true, spl: true, desc: "Butter, mozzarella, mushroom with sun-dried tomatoes." },
            { name: "Exotic Veg Pizza", veg: true, desc: "Broccoli, bell pepper, onion, zucchini, black olives, jalapeño & mushroom." },
            { name: "Bocconcini Cheese Pizza", veg: true },
            { name: "Burrata Cheese Pizza / Burrata Pesto Cheese Pizza", veg: true }
          ]},
          { label: "Pizza · non-veg", items: [
            { name: "Chicken Tikka", price: 630, veg: false },
            { name: "Loaded Chicken", price: 630, veg: false, desc: "BBQ chicken, peri peri chicken and sautéed garlic chicken with mozzarella on our red sauce." },
            { name: "Pesto Chicken", price: 640, veg: false },
            { name: "Carbonara Sauce Pizza with Bacon", price: 645, veg: false },
            { name: "Smoked Chicken with Bacon", price: 660, veg: false, desc: "Smoked grilled chicken with crispy bacon on top." },
            { name: "Garlic Chicken with Red Pimento Chilies", veg: false },
            { name: "Peri Peri Chicken", veg: false },
            { name: "BBQ Chicken", veg: false },
            { name: "Wongdhen Creamy Chicken & Mushroom", veg: false, spl: true },
            { name: "Italian Pepperoni", veg: false }
          ]},
          { label: "Pizzasta", items: [
            { name: "Exotic Mushroom Pizzasta", price: 630, veg: true },
            { name: "Margherita Veg Pizzasta", price: 630, veg: true },
            { name: "Peri Peri Chicken Pizzasta", price: 685, veg: false },
            { name: "BBQ Chicken Pizzasta", price: 685, veg: false },
            { name: "Italian Pepperoni Pizzasta", price: 685, veg: false }
          ]}
        ]
      },
      {
        id: "pasta", label: "Pasta & mains", image: "images/spread-wide.webp",
        note: "All pastas come with a side of garlic bread. Choose penne, spaghetti or farfalle.",
        sub: [
          { label: "Pasta", items: [
            { name: "Alfredo (White Sauce)", price: 500, from: true, options: ["Veg", "Chicken"] },
            { name: "Pesto Cream", price: 590, from: true, options: ["Veg", "Chicken"] },
            { name: "Arrabbiata", options: ["Veg", "Chicken"], desc: "Garlic, tomatoes, dried & red chilli peppers cooked in olive oil." },
            { name: "Pink Sauce", options: ["Veg", "Chicken"], desc: "Mix of white & red sauce with cream." },
            { name: "Alio Olio", options: ["Veg", "Chicken"], desc: "Garlic & oil with chilli flakes." },
            { name: "Vodka Sauce", options: ["Veg", "Chicken"], spl: true, desc: "Our special sauce: red & white, with a little vodka & cream." },
            { name: "Mac & Cheese", options: ["Veg", "Chicken"] },
            { name: "Spaghetti Carbonara (Pork)", veg: false, spl: true },
            { name: "Bolognese (Lamb)", veg: false, desc: "Meat sauce with minced lamb." },
            { name: "Lasagna", options: ["Veg", "Chicken"] }
          ]},
          { label: "Mains", items: [
            { name: "Grilled Cottage Cheese with Sautéed Vegetables", veg: true },
            { name: "Chicken Roulade", veg: false },
            { name: "Lemon Thyme Grilled Chicken, Mash Potatoes & Homemade Jus", veg: false },
            { name: "Creamy Cashew Chicken with Rice", veg: false },
            { name: "BBQ Pork Ribs with Corn Bread", veg: false },
            { name: "Crumb Fried Fish N Chips with Tartar Sauce", veg: false },
            { name: "Grilled Fish with Lemon Butter Sauce", veg: false },
            { name: "Moroccan Lamb with Herb Pilaf", veg: false },
            { name: "Burrito Rice Meal Bowl", options: ["Fajita Cottage Cheese", "Fajita Chicken"] },
            { name: "Buff Tenderloin Steak with Mash Potato & Grilled Vegetables", veg: false }
          ]}
        ]
      },
      {
        id: "starters", label: "Soups, salads & starters", image: "images/dish-burger.webp",
        sub: [
          { label: "Salads (add grilled chicken ₹180)", items: [
            { name: "Caesar Salad", price: 370, desc: "Iceberg lettuce, Fresho lettuce, croutons, cherry tomatoes." },
            { name: "Grilled Vegetarian Salad", price: 370, veg: true },
            { name: "Arugula Burrata Corn Salad", price: 535, veg: true },
            { name: "Greek Salad", veg: true, desc: "Bell peppers, cucumber, cherry tomatoes, citrus dressing, iceberg lettuce." }
          ]},
          { label: "Soups (veg)", items: [
            { name: "Pumpkin & Kaffir Lime", veg: true },
            { name: "Tomato Cream & Sour", veg: true },
            { name: "Creamy Mushroom Soup in a Multigrain Loaf", veg: true }
          ]},
          { label: "Appetizers · veg", items: [
            { name: "Hand Stretched Garlic Breads", price: 370, from: true, veg: true, options: ["Herb Butter", "Herb Butter & Cheese"] },
            { name: "Classic Fries", price: 395, veg: true },
            { name: "Peri Peri Fries", price: 395, veg: true },
            { name: "Falafel Bites with Tzatziki Dip", price: 405, veg: true },
            { name: "Cheesy Mozzarella Sticks", price: 405, veg: true },
            { name: "Cheesy Baked Nachos", price: 405, veg: true, spl: true },
            { name: "Peri Peri Baby Potatoes", price: 405, veg: true },
            { name: "Loaded Cheesy Fries", price: 410, veg: true },
            { name: "Truffle Parmesan Fries", price: 410, veg: true },
            { name: "Chilli Cheese Jalapeño Bread", price: 410, veg: true },
            { name: "V-Crispers", prices: [["Classic", 400], ["Peri Peri", 430], ["Cheese", 460]], veg: true },
            { name: "Hummus & Pita", veg: true },
            { name: "Hummus & Pita with Broccoli & Mushroom", veg: true },
            { name: "Chilli Cheese Toasties", veg: true },
            { name: "Cream Cheese Avocado Toast", veg: true }
          ]},
          { label: "Appetizers · non-veg", items: [
            { name: "Hand Stretched Garlic Breads", price: 410, veg: false, spl: true, desc: "Cheese & chicken / cheese & pepperoni." },
            { name: "Hummus & Pita with Mushroom & Chicken", price: 410, veg: false },
            { name: "Parmesan Chicken Tenders with Cilantro Pesto", price: 455, veg: false, spl: true, desc: "Fried chicken tenders tossed with parmesan." },
            { name: "Chicken Nachos", price: 455, veg: false },
            { name: "Lebanese Chicken Hummus & Pita", price: 455, veg: false, desc: "Chicken skewers (4 pc) with hummus and pita bread." },
            { name: "Chicken Wings", veg: false, desc: "Honey mustard / spiced BBQ." },
            { name: "Texas BBQ Prawns", veg: false },
            { name: "Smoked Salmon Avocado Cream Cheese Toast", veg: false }
          ]},
          { label: "Dips (₹130 each)", items: [
            { name: "Mayo", price: 130, veg: true },
            { name: "Sriracha Mayo", price: 130, veg: true },
            { name: "Tartar", price: 130, veg: true },
            { name: "Tzatziki", price: 130, veg: true },
            { name: "Teriyaki Sauce", price: 130, veg: true }
          ]}
        ]
      },
      {
        id: "sandwiches", label: "Burgers & sandwiches", image: "images/dish-melt.webp",
        note: "Baguette sandwiches come with fries & salad.",
        sub: [
          { label: "Burgers, sandwiches & wraps", items: [
            { name: "Falafel Wrap", price: 460, veg: true },
            { name: "Club Sandwich", price: 470, from: true, options: ["Veg", "Chicken"] },
            { name: "Pesto Grilled Vegetables Italian Sandwich", price: 490, veg: true },
            { name: "The Ultimate Burger", price: 510, veg: true },
            { name: "Garlic Wrap (Chicken)", price: 510, veg: false },
            { name: "Smashed Mushroom Burger", price: 535, veg: true },
            { name: "Butter Milk Crunchy Burger (Chicken)", price: 540, veg: false },
            { name: "BBQ Burger (Chicken)", price: 540, veg: false },
            { name: "Minced Cottage Cheese Burger", price: 540, veg: true },
            { name: "Smashed Burger", prices: [["Chicken", 550], ["Lamb", 570], ["Buff", null]], veg: false },
            { name: "Pesto Italian Sandwich (Chicken)", price: 625, veg: false },
            { name: "Lamb Burger with Fried Mozzarella", price: 680, veg: false },
            { name: "Italian Pepperoni Sandwich", veg: false }
          ]},
          { label: "Korean milk bread sandwiches", items: [
            { name: "Crispy Potato Korean Sandwich", price: 470, veg: true },
            { name: "Cheesy Egg with Chicken Ham Sandwich", price: 470, veg: false },
            { name: "Fried Chicken Sandwich with Lettuce", price: 505, veg: false },
            { name: "Crispy Chilli Pork Ribs Sandwich", price: 645, veg: false },
            { name: "Grilled Cheese Korean Sandwich", veg: true },
            { name: "Crispy Fish with Tartar Sauce & Coleslaw Sandwich", veg: false }
          ]},
          { label: "Toasted baguette & sourdough sandwiches", items: [
            { name: "Mushroom Baguette Sandwich", price: 470, veg: true },
            { name: "Crispy Paneer Baguette Sandwich", price: 495, veg: true },
            { name: "Pulled Chicken Baguette Sandwich", price: 515, veg: false },
            { name: "Fried Fish Baguette Sandwich", price: 545, veg: false },
            { name: "Grilled Chicken Sourdough Sandwich", price: 625, veg: false },
            { name: "Tenderloin Steak Sandwich", price: 645, veg: false }
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
            { name: "Banoffee Pie (Eggless)", price: 340, veg: true },
            { name: "Oreo Cheesecake (Eggless)", price: 350, veg: true },
            { name: "Red Velvet Cake (Eggless)", price: 350, veg: true },
            { name: "Triple Chocolate Mousse", price: 355, veg: true },
            { name: "Japanese Cheesecake", price: 370 },
            { name: "Blueberry Cheesecake", price: 375 },
            { name: "Basque Cheesecake", price: 390 },
            { name: "Mud Cake", prices: [["Slice", 395], ["½ kg", 940]] },
            { name: "Biscoff Cheesecake (Eggless)", price: 410, veg: true },
            { name: "Tiramisu Cake" },
            { name: "Matcha Cheesecake" },
            { name: "Brownie with Ice Cream" },
            { name: "Walnut Brownie" },
            { name: "Apple Crumble", options: ["Plain", "With ice cream (eggless)"] },
            { name: "Truffle Chocolate Apricot Cake" }
          ]},
          { label: "Asian dessert", items: [
            { name: "Darsan with Ice Cream", desc: "Fried crispy honey noodles with sesame seeds and vanilla ice cream." }
          ]}
        ]
      },
      {
        id: "bakery", label: "From the bakery", image: "images/tiramisu.webp",
        note: "Fresh every day. Ask at the counter for today's bakes.",
        sub: [
          { label: "Breads", items: [
            { name: "Country Sourdough", price: 299, veg: true },
            { name: "Focaccia Bread", price: 230, veg: true },
            { name: "Garlic Cheese Pull-Apart", price: 220, veg: true },
            { name: "Pesto Babka", price: 240, veg: true }
          ]},
          { label: "Pastries, muffins & doughnuts", items: [
            { name: "Cookies (Eggless)", price: 160, veg: true },
            { name: "Vanilla Muffin", price: 240 },
            { name: "Chocolate Muffin", price: 240 },
            { name: "Cupcake", prices: [["Chocolate", 250], ["Vanilla", null]] },
            { name: "Macaron", prices: [["Chocolate", 260], ["Blueberry", 260], ["Strawberry", null]] },
            { name: "Cream Doughnut", price: 280 },
            { name: "Doughnuts", options: ["Blueberry", "Chocolate", "Strawberry", "Sugar"] },
            { name: "Croissants", options: ["Butter", "Chocolate", "Almond"] },
            { name: "Éclair", options: ["Chocolate", "Vanilla"] }
          ]}
        ]
      }
    ]
  },
  {
    id: "drinks", label: "Drinks", unfiltered: true,
    groups: [
      {
        id: "coffee", label: "Coffee", image: "images/latte.webp",
        note: "Add a flavour (hazelnut, vanilla, caramel or tiramisu) ₹30 · oat milk ₹180.",
        sub: [
          { label: "Hot coffee", items: [
            { name: "Espresso", prices: [["Double shot", 325], ["Single shot", null]] },
            { name: "Flat White", price: 325 },
            { name: "Americano", price: 335 },
            { name: "Pour Over", price: 335 },
            { name: "Caffè Latte", price: 335 },
            { name: "Cappuccino", price: 355 },
            { name: "Caffè Mocha", price: 365 },
            { name: "Caffè Macchiato" }
          ]},
          { label: "Iced coffee", items: [
            { name: "Ice Americano", price: 335 },
            { name: "Ice Mango Americano", price: 335 },
            { name: "Ice Cranberry Americano", price: 335 },
            { name: "Ice Pour Over", price: 335 },
            { name: "Ice Matcha Latte", price: 365 },
            { name: "Vietnamese Coffee", price: 370 },
            { name: "Ice Latte", price: 380 },
            { name: "Ice Mocha", price: 380 },
            { name: "Ice Orange Mocha", price: 380 },
            { name: "Ice Macchiato", price: 380 },
            { name: "Affogato Espresso", price: 395 }
          ]},
          { label: "Ice blend frappé", items: [
            { name: "Wongdhen Frozen Cold Coffee", price: 350 },
            { name: "Choco Chip Frappe", price: 375 },
            { name: "Caramel Frappe", price: 375 },
            { name: "Tiramisu Frappe", price: 375 },
            { name: "Hazelnut Frappe", price: 375 },
            { name: "Strawberry Frappe", price: 375 },
            { name: "Oreo Frappe", price: 385 },
            { name: "Caramel Double Espresso Frappuccino", price: 385 }
          ]},
          { label: "Coffee-free hot drinks", items: [
            { name: "Hot Chocolate", price: 330 },
            { name: "Marshmallow Hot Chocolate", price: 370 }
          ]}
        ]
      },
      {
        id: "tea", label: "Tea, matcha & bubble tea",
        sub: [
          { label: "Hot tea", items: [
            { name: "Ginger Honey Lemon Tea", price: 225 },
            { name: "English Breakfast Tea", price: 230 },
            { name: "Green Tea", price: 230 },
            { name: "Hibiscus Herbal Tea", price: 240 },
            { name: "Masala Chai", price: 240 },
            { name: "Chamomile Tea", price: 265 },
            { name: "Ginger Lemon Matcha Tea", price: 270 },
            { name: "Matcha Tea", price: 335 }
          ]},
          { label: "Iced tea & matcha", items: [
            { name: "Hibiscus & Passion Fruit Lemonade", price: 350 },
            { name: "Hibiscus & Mint Tea", price: 350 },
            { name: "Peach Ice Tea", price: 350 },
            { name: "Classic Lemon Ice Tea", price: 350 },
            { name: "Mango Ice Tea", price: 350 },
            { name: "Ice Matcha Tea", price: 435 },
            { name: "Iced Japanese Matcha Tea", price: 435 },
            { name: "Biscoff Japanese Matcha Tea", price: 435 },
            { name: "Mango Japanese Matcha Tea", price: 435 },
            { name: "Strawberry Japanese Matcha Tea", price: 435 }
          ]},
          { label: "Bubble tea", items: [
            { name: "Blueberry Popping Boba", price: 385 },
            { name: "Taro Love Bubble Tea", price: 415 },
            { name: "Salted Caramel Bubble Tea", price: 415 },
            { name: "Silky Strawberry Bubble Tea", price: 415 },
            { name: "Boba Milk Tea", price: 415 },
            { name: "Dalgona Coffee Bubble Tea", price: 415 },
            { name: "Coffee Bubble with Coffee Jelly", price: 415 },
            { name: "Fresh Mango Jelly Boba", price: 415 },
            { name: "Jasmine Green Tea with Honey & Jelly", price: 415 },
            { name: "Lime Green Tea with Jelly", price: 415 },
            { name: "Lychee Mint Bubble Tea", price: 415 },
            { name: "Peach Ice Tea with Jelly", price: 415 },
            { name: "Mango Coconut Sago", price: 415 },
            { name: "Coffee Bubble Tea", price: 420 },
            { name: "Brown Sugar Japanese Matcha Bubble Tea", price: 435 },
            { name: "Matcha Bubble Tea", price: 450 },
            { name: "Brown Sugar Bubble Tea" }
          ]},
          { label: "Kombucha", items: [
            { name: "Kombucha", prices: [["Ginger & Lemon", 355], ["Mint & Lime", 355], ["Apple Cinnamon", 355]] }
          ]}
        ]
      },
      {
        id: "coolers", label: "Shakes, mocktails & more", image: "images/mojitos.webp",
        sub: [
          { label: "Shakes", items: [
            { name: "Banana Shake", price: 365 },
            { name: "Strawberry Cream Shake", price: 390 },
            { name: "Mango Madness Shake", price: 390 },
            { name: "Blueberry Shake", price: 390 },
            { name: "Chocolate Brownie Shake", price: 410 },
            { name: "Lotus Biscoff Shake", price: 410 },
            { name: "Oreo Shake", price: 410 },
            { name: "Banana Caramel Shake", price: 410 },
            { name: "Gelato Shake", price: 410 },
            { name: "Mixed Berry Banana Shake", price: 410 },
            { name: "Choco Chip Shake" },
            { name: "Vanilla Shake" }
          ]},
          { label: "Mocktails & aerated drinks", items: [
            { name: "Classic Mojito", price: 325 },
            { name: "Coke / Fanta / Sprite", price: 160 },
            { name: "Perrier Sparkling Water", price: 330 },
            { name: "Green Apple / Mint Mojito" },
            { name: "Wongdhen Signature Mojito" },
            { name: "Unicorn Lemonade" },
            { name: "Pineapple Sunrise Punch" },
            { name: "Watermelon Basil Cooler" },
            { name: "Orange & Kaffir Lime Paloma" },
            { name: "Mulled Cold Non-Alcoholic Sangria" },
            { name: "Summer Cooler" },
            { name: "Fresh Lime / Fresh Lime Soda", options: ["Sweet", "Salt", "Mix"] }
          ]},
          { label: "Fresh juice & slush", items: [
            { name: "Orange Juice", price: 330 },
            { name: "Watermelon Juice", price: 330 },
            { name: "Mix Fruit Juice", price: 340 },
            { name: "ABC Juice", price: 410 },
            { name: "Punky Pulse Slush", price: 400 },
            { name: "Watermelon Slush", price: 400 },
            { name: "Mango Slush", price: 400 }
          ]},
          { label: "Smoothies (curd mix)", items: [
            { name: "Banana Mixed Berries Smoothie" },
            { name: "Mango Madness Smoothie" },
            { name: "Tropical Fruit Smoothie" },
            { name: "Passion Fruit & Cucumber Smoothie" },
            { name: "Blueberry Smoothie" }
          ]}
        ]
      }
    ]
  }
];
