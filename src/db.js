
const PRODUCTS = [
    {
      img: "https://www.thespruceeats.com/thmb/w9wpnp_0xhiKRKocGSAIPdr9VB4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/HamandCheeseOmeletHero5-cb8db013754a418b948bc77384734c62.jpg",
      name: "Ham & Cheese Omelette",
      id: 1,
      price: "200",
      category: "omelettes",
      amountInStock: 200 ,
      option: ''
    },
    {
      img: "https://dfwblobstorage.blob.core.windows.net/images/Recipe/sausage-and-colby-cheese-omelet-roll.jpg",
      name: "Sausage Omelette",
      id: 2,
      price: "200",
      category: "omelettes",
      amountInStock: 200  ,
      option:''
    },
  
    {
      img: "https://thriftandspice.com/wp-content/uploads/2018/02/how-to-make-a-cheese-omelet-2.jpg",
      name: "Cheese Omelette",
      id: 3,
      price: "200",
      category: "omelettes",
      amountInStock: 200  
    },
    {
      img: "https://www.allrecipes.com/thmb/9XiqhGVYfnFUyarPgCyZZJfcCgo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4542975-mushroom-scallion-and-cheese-omelet-Christina-4x3-1-c406d4f9d7d14db4802a8bbd09113bf6.jpg",
      name: "Mushroom Omelette",
      id: 4,
      price: "200",
      category: "omelettes",
      amountInStock: 200  
    },
    {
      img: "https://wearenotmartha.com/wp-content/uploads/western-omelet-featured-2.jpg",
      name: "Western Omelette",
      id: 4,
      price: "200",
      category: "omelettes",
      amountInStock: 200  
    },
    {
      img: "https://img.jamieoliver.com/jamieoliver/recipe-database/46260004.jpg?tr=w-800,h-600",
      name: "Spanish Omelette",
      id: 5,
      price: "50",
      category: "omelettes",
      amountInStock: 200  
    },
  
    {
      img: "https://lh3.googleusercontent.com/iQc-t5Dp47R8k6lGL67GnqefDB6Abtd7nJsz0O1H-nyZARx4wfoS8rGcZL6GcJhhWQ4OrUoZ_obBuQDl8QgFtknZE_VOh2_sBtsk8w=s1200-p",
      name: "Turkey & Cheese Omelette",
      id: 6,
      price: "50",
      category: "omelettes",
      amountInStock: 200  
    },
  
    {
      img: "https://www.allrecipes.com/thmb/lSRaH7gZCEoTl9SM2hI9ZProD98=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/5941200-yummy-veggie-omelet-AllrecipesPhot-4x3o-9731d76434de4b7daae40281f56a7a66.jpg",
      name: "Vegetarian Omelette",
      id: 7,
      price: "200",
      category: "omelettes",
      amountInStock: 200  
    },
  
    {
      img: "https://www.foodandwine.com/thmb/iJfsIgNrHUYiBEr1ePHR9EdI20U=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-butter-basted-rib-eye-steaks-step-04-53afaef590034cbe961d57e283db6b50.jpg",
      name: "Rib Eye",
      id: 8,
      price: "200",
      category: "steak",
      amountInStock: 200  
    },
  
    {
      img: "https://omnivorescookbook.com/wp-content/uploads/2020/06/200517_Chinese-Fried-Pork-Chops_1.jpg",
      name: "Two Pork Chops",
      id: 9,
      price: "150",
      category: "steak",
      amountInStock: 200  
    },
    {
      img: "https://downshiftology.com/wp-content/uploads/2023/01/How-To-Make-Air-Fryer-Chicken-5.jpg",
      name: "Chicken Breast",
      id: 10,
      price: "150",
      category: "steak",
      amountInStock: 200  
    },
    {
      img: "https://houseofnasheats.com/wp-content/uploads/2021/10/How-to-Cook-Salmon-Steaks-Square-1.jpg",
      name: "Salmon Steak",
      id: 11,
      price: "150",
      category: "fish",
      amountInStock: 200  
    },
    {
      img: "https://www.cookingclassy.com/wp-content/uploads/2020/12/fried-shrimp-27.jpg",
      name: "Fried Jumbo Shrimp",
      id: 12,
      price: "150",
      category: "fish",
      amountInStock: 200  
    },
    {
      img: "https://static1.squarespace.com/static/61c38dbdda885109e22a3868/t/6258922f82e55d1f02428120/1649971764888/fried+flounder.jpg?format=1500w",
      name: "Fried Fillet of Flounder",
      id: 13,
      price: "150",
      category: "fish",
      amountInStock: 200  
    },
  
    {
      img: "https://www.themediterraneandish.com/wp-content/uploads/2021/02/fried-calamari-recipe-7.jpg",
      name: "Fried Calamari",
      id: 14,
      price: "100",
      category: "fish",
      size: '',
      amountInStock: 200 
    },
    {
      img: "https://www.allrecipes.com/thmb/RnXsUU-Gv38HLSZCIZ5ilSRVRUE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20513-classic-waffles-mfs-020_step5-3b9dd667bf1a46a09e3a84d274715f87.jpg",
      name: "Plain Waffle",
      id: 15,
      price: "100",
      category: "waffles",
      size: '',
      amountInStock: 200  
    },
    {
      img: "https://littlesunnykitchen.com/wp-content/uploads/2021/04/Strawberry-Waffles-1.jpg",
      name: "Waffle with strawberry",
      id: 16,
      price: "100",
      category: "waffles",
      amountInStock: 200  
    },
    {
      img: "https://sugarspunrun.com/wp-content/uploads/2022/03/easy-Chocolate-Whipped-cream-recipe-1-of-1-2.jpg",
      name: "Chocolate Whipped Cream",
      id: 17,
      price: "100",
      category: "waffles",
      amountInStock: 200  
    },
    {
      img: "https://www.alphafoodie.com/wp-content/uploads/2020/11/Orange-Juice-1-of-1.jpeg",
      name: "Orange",
      id: 18,
      price: "50",
      category: "juice",
      amountInStock: 200  
    },
    {
      img: "https://images.onlymyhealth.com/imported/images/2022/November/19_Nov_2022/main-applejuicebenefits.jpg",
      name: "Apple",
      id: 19,
      price: "50",
      category: "juices",
      amountInStock: 200  
    },
    {
      img: "https://www.health.com/thmb/J1FqauJgL0BEekAABEo-GfEhRaA=/2121x0/filters:no_upscale():max_bytes(150000):strip_icc()/CranberryJuice-f460a61fe4f04b059750c4de70288e9e.jpg",
      name: "Cranberry",
      id: 20,
      price: "100",
      category: "juices",
      amountInStock: 200  
    },
    {
      img: "https://i.ebayimg.com/images/g/tSQAAOSwGBNiuxEO/s-l1600.jpg",
      name: "Softdrinks",
      id: 21,
      price: "150",
      category: "beverages",
      amountInStock: 200  
    },
    {
      img: "https://natashaskitchen.com/wp-content/uploads/2021/07/Iced-Tea-SQ-1.jpg",
      name: "Iced Tea",
      id: 22,
      price: "200",
      category: "beverages",
      amountInStock: 200  
    },
  
    {
      img: "https://neurosciencenews.com/files/2023/06/coffee-brain-caffeine-neuroscincces.jpg",
      name: "Coffee",
      id: 23,
      price: "200",
      category: "beverages",
      amountInStock: 200  
    },
    {
      img: "https://cdn-prod.medicalnewstoday.com/content/images/articles/324/324771/close-up-of-a-cup-of-tea.jpg",
      name: "Hot Tea",
      id: 24,
      price: "50",
      category: "beverages",
      amountInStock: 200  
    },
    {
      img: "https://feelgoodfoodie.net/wp-content/uploads/2021/11/how-to-make-hot-chocolate-7.jpg",
      name: "Hot Chocolate",
      id: 25,
      price: "150",
      category: "beverages",
      amountInStock: 200  
    },
    {
      img: "https://downshiftology.com/wp-content/uploads/2022/10/Almond-Milk-Recipe-22-8.jpg",
      name: "Milk",
      id: 26,
      price: "50",
      category: "beverages",
      amountInStock: 200  
    },
    {
      img: "https://www.thespruceeats.com/thmb/7qHhYYQE91l6QZTeDc59HKXgIOQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/chocolate-milk-recipe-2355494-hero-01-d44b4548f5904a758ed12d5caa0466fd.jpg",
      name: "Chocolate Milk",
      id: 27,
      price: "50",
      category: "beverages",
      amountInStock: 200  
    },  
  ];
  
  export default PRODUCTS;