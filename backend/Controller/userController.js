

const User = require("../Model/userModel");
const bcrypt = require("bcryptjs");
const {
  addDoc,
  getDocs,
  where,
  query,
  updateDoc,
  arrayUnion,
  arrayRemove,
} = require("firebase/firestore");

// async function SignupUser(req, res) {
//   try {
//     const { name, phNumber, email, address, dob } = req.body;
//     console.log( name, phNumber, email, address, dob );

//     // Check if all fields are provided
//     if (!name || !phNumber || !email || !address || !dob) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const phoneQuery = query(User, where("phNumberD", "==", phNumber));
//     const phoneSnapshot = await getDocs(phoneQuery);

//     if (!phoneSnapshot.empty) {
//       return res
//         .status(400)
//         .json({ message: "User with this phone number already exists" });
//     }

//     // Check if a user with the same email already exists
//     const q = query(User, where("emailD", "==", email));
//     const querySnapshot = await getDocs(q);

//     if (!querySnapshot.empty) {
//       return res
//         .status(400)
//         .json({ message: "User with this email already exists" });
//     }


//     // Create a new user document with a unique ID
//     const newUser = {
//       nameD: name,
//       phNumberD: phNumber,
//       emailD: email.toLowerCase(),
//       addressD: address,
//       dobD: dob
//     };

//     // Add the new user to Firestore
//     await addDoc(User, newUser); // Add user document

//     // Send a success response
//     res.status(201).json({ message: "User registered successfully!", newUser });
//   } catch (err) {
//     console.error("Error registering user:", err);
//     res.status(500).json({ error: "Error registering user", details: err });
//   }
// }
async function SignupUser(req, res) {
  try {
    const { name, phNumber, email, address, dob } = req.body;

    // Check if all fields are provided
    if (!name || !phNumber || !email || !address || !dob) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists by phone number
    const phoneQuery = query(User, where("phNumberD", "==", phNumber));
    const phoneSnapshot = await getDocs(phoneQuery);

    // Check if user exists by email
    const emailQuery = query(User, where("emailD", "==", email.toLowerCase()));
    const emailSnapshot = await getDocs(emailQuery);

    // If user exists, return login success
    if (!phoneSnapshot.empty || !emailSnapshot.empty) {
      const existingUser = phoneSnapshot.empty ? emailSnapshot.docs[0].data() : phoneSnapshot.docs[0].data();
      return res.status(200).json({ 
        message: "User already exists. Logged in successfully!", 
        user: existingUser 
      });
    }

    // Create a new user document
    const newUser = {
      nameD: name,
      phNumberD: phNumber,
      emailD: email.toLowerCase(),
      addressD: address,
      dobD: dob
    };

    // Add the new user to Firestore
    await addDoc(User, newUser);

    // Send a success response for new user registration
    res.status(201).json({ 
      message: "User registered successfully!", 
      user: newUser 
    });

  } catch (err) {
    console.error("Error processing user:", err);
    res.status(500).json({ 
      error: "Error processing user registration/login", 
      details: err 
    });
  }
}

async function LoginUser(req, res) {
  console.log("User Login executed");
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Phone number, Email and password are required " });
    }

    // Find user in Firestore
    const q = query(User, where("emailD", "==", email));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = userSnapshot.docs[0].data(); // Assuming first user found is the correct one

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.passwordD);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ error: "Error logging in", details: err });
  }
}

async function AllUsersDetail(req, res) {
  try {
    const allUsersSnapshot = await getDocs(User);
    const allUsers = allUsersSnapshot.docs.map((doc) => doc.data());

    return res.json(allUsers);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Error fetching users", details: err });
  }
}

async function userExists(req, res) {
  try {
    const { email } = req.body;
    console.log(email);

    // Validate input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Query Firestore to check if the user exists
    const q = query(User, where("emailD", "==", email));
    const userSnapshot = await getDocs(q);

    // Check if any documents match the query
    if (!userSnapshot.empty) {
      return res
        .status(200)
        .json({ exists: true, message: "User exists", email });
    } else {
      return res
        .status(404)
        .json({ exists: false, message: "User does not exist" });
    }
  } catch (err) {
    console.error("Error checking user existence:", err);
    res
      .status(500)
      .json({ error: "Error checking user existence", details: err.message });
  }
}

async function addToCart(req, res) {
  try {
    const { email, product } = req.body;

    // Validate input
    if (!email || !product) {
      return res
        .status(400)
        .json({ message: "Email and product are required" });
    }

    // Query Firestore to check if the user exists
    const q = query(User, where("emailD", "==", email)); // Assuming emailD is the field for email
    const userSnapshot = await getDocs(q);

    // Check if any documents match the query
    if (userSnapshot.empty) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Get the user's document reference (assuming there's one match)
    const userDocRef = userSnapshot.docs[0].ref;

    // Retrieve the user's cart from the document
    const userDoc = userSnapshot.docs[0].data();
    const cartItems = userDoc.cart || [];

    // Generate a uniqueId based on the current length of the cart
    const uniqueId = cartItems.length + 1; // Using the cart length to generate a new unique ID

    // Attach the generated unique ID to the product
    product.uniqueIdD = uniqueId;

    // Check if the product already exists in the cart
    const productExists = cartItems.some(
      (item) =>
        item.idD === product.idD &&
        item.selectedColorD === product.selectedColorD &&
        item.selectedSizeD === product.selectedSizeD
    );

    if (productExists) {
      return res.status(201).json({ message: "Item already exists in cart" });
    }

    // Add the product to the user's cart (using arrayUnion to avoid duplication)
    await updateDoc(userDocRef, {
      cart: arrayUnion(product),
    });

    return res
      .status(200)
      .json({ message: "Product added to cart successfully", product });
  } catch (err) {
    console.error("Error adding product to cart:", err);
    res
      .status(500)
      .json({ error: "Error adding product to cart", details: err.message });
  }
}




async function getCart(req, res) {
    try {
      const { email } = req.body;
  
      // Validate input
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      // Query Firestore to check if the user exists
      const q = query(User, where("emailD", "==", email));
      const userSnapshot = await getDocs(q);
  
      // Check if any documents match the query
      if (userSnapshot.empty) {
        return res.status(404).json({ message: "User does not exist" });
      }
  
      // Get the user's document reference (assuming there's one match)
      const userDocRef = userSnapshot.docs[0].data();
  
      // Retrieve the cart data from the user's document
      const cartItems = userDocRef.cart || []; // Default to an empty array if cart doesn't exist
  
      return res.status(200).json({ message: "Cart retrieved successfully", cart: cartItems });
    } catch (err) {
      console.error("Error retrieving cart data:", err);
      res.status(500).json({ error: "Error retrieving cart data", details: err.message });
    }
  }



async function deleteFromCart(req, res) {
  try {
    const { email, uniqueId } = req.body;

    // Validate input
    if (!email || !uniqueId) {
      return res.status(400).json({
        message: "Email and unique ID are required",
      });
    }

    // Query Firestore to check if the user exists
    const q = query(User, where("emailD", "==", email));
    const userSnapshot = await getDocs(q);

    // Check if any documents match the query
    if (userSnapshot.empty) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Get the user's document reference (assuming there's one match)
    const userDocRef = userSnapshot.docs[0].ref;

    // Get the user's current cart
    const userData = userSnapshot.docs[0].data();
    const currentCart = userData.cart || [];

    // Find the product in the cart using the unique ID
    const productToRemove = currentCart.find((item) => item.uniqueIdD === uniqueId);

    if (!productToRemove) {
      return res
        .status(404)
        .json({ message: "Product with the specified unique ID not found in the cart" });
    }

    // Remove the product from the cart
    await updateDoc(userDocRef, {
      cart: arrayRemove(productToRemove),
    });

    return res.status(200).json({
      message: "Product removed from cart successfully",
      uniqueId,
    });
  } catch (err) {
    console.error("Error removing product from cart:", err);
    res.status(500).json({
      error: "Error removing product from cart",
      details: err.message,
    });
  }
}


async function addToWishlist(req, res) {
  try {
    const { email, product } = req.body;

    if (!email || !product) {
      return res.status(400).json({ message: "Email and product are required" });
    }

    const q = query(User, where("emailD", "==", email));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const userDocRef = userSnapshot.docs[0].ref;
    const userDoc = userSnapshot.docs[0].data();
    const wishlistItems = userDoc.wishlist || [];

    const productExists = wishlistItems.some(item => item.idD === product.idD);

    if (productExists) {
      await updateDoc(userDocRef, {
        wishlist: arrayRemove(wishlistItems.find(item => item.idD === product.idD))
      });
      return res.status(200).json({ 
        message: "Product removed from wishlist",
        success: true,
        updatedWishlist: wishlistItems.filter(item => item.idD !== product.idD)
      });
    }

    await updateDoc(userDocRef, {
      wishlist: arrayUnion(product)
    });

    return res.status(200).json({ 
      message: "Product added to wishlist",
      success: true,
      updatedWishlist: [...wishlistItems, product]
    });
  } catch (err) {
    console.error("Error updating wishlist:", err);
    res.status(500).json({ 
      error: "Error updating wishlist", 
      details: err.message 
    });
  }
}

// async function getWishlist(req, res) {
//   try {
//     const { email } = req.params;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     // Ensure 'User' refers to the collection
//     const userCollection = collection(db, "users"); // Adjust 'users' if your collection name is different
//     const q = query(userCollection, where("emailD", "==", email)); // Match field name with frontend
    
//     const userSnapshot = await getDocs(q);

//     if (userSnapshot.empty) {
//       return res.status(404).json({ message: "User does not exist" });
//     }

//     const userDoc = userSnapshot.docs[0].data();
//     const wishlistItems = userDoc.wishlist || [];

//     return res.status(200).json({ 
//       message: "Wishlist retrieved successfully", 
//       wishlist: wishlistItems 
//     });
//   } catch (err) {
//     console.error("Error retrieving wishlist:", err);
//     res.status(500).json({ 
//       error: "An unexpected error occurred" // Hide detailed error from client
//     });
//   }
// }

async function getWishlist(req, res) {
  try {
    const { email } = req.query; // Using req.query to get the email from query parameters

    // Validate the input
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Query Firestore to find the user by email
    const q = query(User, where("emailD", "==", email)); 
    const userSnapshot = await getDocs(q);

    // Check if the user exists
    if (userSnapshot.empty) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Assuming the first matching document is the user's data
    const userDoc = userSnapshot.docs[0].data();
    const wishlistItems = userDoc.wishlist || []; // Default to an empty array if wishlist is undefined

    // Send the wishlist items in the response
    return res.status(200).json({ 
      message: "Wishlist retrieved successfully", 
      success: true,
      wishlist: wishlistItems 
    });
  } catch (err) {
    console.error("Error retrieving wishlist:", err);
    res.status(500).json({ 
      error: "An unexpected error occurred", 
      details: err.message 
    });
  }
}
async function removeFromWishlist(req, res) {
  try {
    const { email, productId } = req.body;

    if (!email || !productId) {
      return res.status(400).json({ message: "Email and product ID are required" });
    }

    const q = query(User, where("emailD", "==", email));
    const userSnapshot = await getDocs(q);

    if (userSnapshot.empty) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const userDocRef = userSnapshot.docs[0].ref;
    const userDoc = userSnapshot.docs[0].data();
    const wishlistItems = userDoc.wishlist || [];

    const productToRemove = wishlistItems.find(item => item.idD === productId);

    if (!productToRemove) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    await updateDoc(userDocRef, {
      wishlist: arrayRemove(productToRemove)
    });

    return res.status(200).json({ 
      message: "Product removed from wishlist successfully",
      productId
    });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    res.status(500).json({ 
      error: "Error removing from wishlist", 
      details: err.message 
    });
  }
}


// Function to place an order and store it in the user's orders array
async function placeOrder(req, res) {
  try {
    const { email, orderDetails,totalAmount  } = req.body;

    // Validate input
    if (!email || !orderDetails || orderDetails.length === 0||totalAmount === undefined) {
      return res.status(400).json({ message: "Email and order details are required" });
    }

    // Query Firestore to check if the user exists
    const userQuery = query(User, where("emailD", "==", email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user document reference
    const userDocRef = userSnapshot.docs[0].ref;

    // Prepare the order object with timestamp
    const orderTimestamp = new Date();
    const order = {
      orderDetails: orderDetails,
      totalAmount,
      placedAt: orderTimestamp,  // Timestamp for when the order was placed
      
    };

    // Add the order to the 'orders' array in the user's document
    await updateDoc(userDocRef, {
      orders: arrayUnion(order),
      cart: [],
    });

    return res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Error placing order", details: err.message });
  }
}

// Function to get orders stored in the user's orders array
async function getOrdersByDate(req, res) {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Query Firestore to check if the user exists
    const userQuery = query(User, where("emailD", "==", email));
    const userSnapshot = await getDocs(userQuery);

    if (userSnapshot.empty) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get user data (including orders array)
    const userDoc = userSnapshot.docs[0].data();
    const orders = userDoc.orders || [];  // Retrieve orders array from user document

    // Sort orders by the placedAt timestamp
    orders.sort((a, b) => b.placedAt.seconds - a.placedAt.seconds); // Sorting by most recent first

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders placed yet" });
    }

    return res.status(200).json({ orders });
  } catch (err) {
    console.error("Error retrieving orders:", err);
    res.status(500).json({ error: "Error retrieving orders", details: err.message });
  }
}


// module.exports = {addToCart};

module.exports = {
  SignupUser,
  LoginUser,
  AllUsersDetail,
  userExists,
  addToCart,
  deleteFromCart,
  getCart,
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  placeOrder,
  getOrdersByDate
};