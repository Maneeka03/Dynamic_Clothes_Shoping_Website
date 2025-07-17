const Cloth = require("../Model/clothModel");
const {getDocs,addDoc,query,where,doc,updateDoc,getDoc} = require("firebase/firestore");



async function AddCloths(req, res) {
    console.log('Request Body:', req.body);  // Log request body

    const { name, price, size, color, detail, image, category, productCategory, brand, originalPrice,quantity, rating} = req.body;

    try {
        // Fetch all cloth documents
        const allClothSnapshot = await getDocs(Cloth);
        if (!allClothSnapshot || !allClothSnapshot.docs) {
            return res.status(500).send({ msg: "Failed to fetch cloth collection" });
        }

        // Ensure size and color are arrays
        const sizes = Array.isArray(size) ? size : size ? [size] : [];
        const colors = Array.isArray(color) ? color : color ? [color] : [];
        const images = Array.isArray(image) ? image : image ? [image] : [];
        // const images = Array.isArray(image) ? image : image ? [image] : [];

        // Calculate the ID based on the number of documents
        const id = allClothSnapshot.docs.length + 1;

        // Validate required fields
        if (!name || !price || !detail || !brand || !category || !productCategory || !originalPrice || !rating ) {
            return res.status(400).send({ msg: "All fields are required" });
        }

        // Create the new cloth object
        const newCloth = {
            idD: Number(id),
            nameD: name,
            brandD: brand,
            categoryD: category,
            quantityD: Number(quantity),
            productCategoryD: productCategory,
            originalPriceD: Number(originalPrice), 
            priceD: Number(price),
            sizeD: sizes,
            ratingD: Number( rating),
            colorD: colors,
            imageD: images,
            detailD: detail,
            // imageD: images, // image path saved
        };

        // Add the new cloth to Firestore
        await addDoc(Cloth, newCloth);

        res.send({ msg: "Cloth Added", data: newCloth });
    } catch (err) {
        console.error("Error adding cloth:", err);
        res.status(500).send({ msg: "Error adding cloth", error: err.message });
    }
}



async function AllClothsDetails(req, res) {
    try {
        const allCloth = await getDocs(Cloth);
        const clothList = allCloth.docs.map((doc) => doc.data());
        // console.log(clothList);
        return res.json(clothList);
    } catch (err) {
        console.error("Error fetching cloth:", err);
        res.status(500).json({ error: "Error fetching cloth", details: err });
    }
}



async function SearchClothByName(req, res) {
    const searchQuery = req.query.query || ''; // Get the search query from the query parameter

    if (!searchQuery) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Reference to the "cloths" collection in Firestore
        const clothCollectionRef = Cloth; // Assuming Cloth is your collection reference

        // Get all products (you can consider adding pagination if you have a lot of data)
        const querySnapshot = await getDocs(clothCollectionRef);

        if (querySnapshot.empty) {
            return res.status(404).json({ message: 'No products found matching your query' });
        }

        // Map through the querySnapshot and return the cloth data
        const clothList = querySnapshot.docs.map(doc => doc.data());

        // Filter the clothList to only include products that contain the searchQuery anywhere in the name
        const filteredList = clothList.filter(item =>
            item.nameD.toLowerCase().includes(searchQuery.toLowerCase()) // Check if the name contains the query anywhere
        );

        // Return the matching products
        if (filteredList.length > 0) {
            return res.json(filteredList);
        } else {
            return res.status(404).json({ message: 'No products found containing the search query' });
        }

    } catch (err) {
        console.error('Error fetching cloths:', err);
        return res.status(500).json({ error: 'Error fetching cloths', details: err.message });
    }
}



async function SearchClothByDetail(req, res) {
    const searchQuery = req.query.query || ''; // Get the search query from the query parameter

    if (!searchQuery) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Reference to the "cloths" collection in Firestore
        const clothCollectionRef = Cloth; // Assuming Cloth is your collection reference

        // Get all products (you can consider adding pagination if you have a lot of data)
        const querySnapshot = await getDocs(clothCollectionRef);

        if (querySnapshot.empty) {
            return res.status(404).json({ message: 'No products found matching your query' });
        }

        // Map through the querySnapshot and return the cloth data
        const clothList = querySnapshot.docs.map(doc => doc.data());

        // Filter the clothList to only include products that contain the searchQuery anywhere in the name
        const filteredList = clothList.filter(item =>
            item.detailD.toLowerCase().includes(searchQuery.toLowerCase()) // Check if the name contains the query anywhere
        );

        // Return the matching products
        if (filteredList.length > 0) {
            return res.json(filteredList);
        } else {
            return res.status(404).json({ message: 'No products found containing the search query' });
        }

    } catch (err) {
        console.error('Error fetching cloths:', err);
        return res.status(500).json({ error: 'Error fetching cloths', details: err.message });
    }
}



async function SearchClothByCategory(req, res) {
    const searchQuery = req.query.query || ''; // Get the search query from the query parameter

    if (!searchQuery) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Reference to the "cloths" collection in Firestore
        const clothCollectionRef = Cloth; // Assuming Cloth is your collection reference

        // Get all products (you can consider adding pagination if you have a lot of data)
        const querySnapshot = await getDocs(clothCollectionRef);

        if (querySnapshot.empty) {
            return res.status(404).json({ message: 'No products found matching your query' });
        }

        // Map through the querySnapshot and return the cloth data
        const clothList = querySnapshot.docs.map(doc => doc.data());

        // Create a regular expression for the search query
        const regex = new RegExp(`\\b${searchQuery}\\b`, 'i'); // 'i' for case-insensitive matching

        // Filter the clothList to only include products where the category matches the query as a whole word
        const filteredList = clothList.filter(item =>
            regex.test(item.categoryD) // Use regex to match whole words in the category
        );

        // Return the matching products
        if (filteredList.length > 0) {
            return res.json(filteredList);
        } else {
            return res.status(404).json({ message: 'No products found containing the search query' });
        }

    } catch (err) {
        console.error('Error fetching cloths:', err);
        return res.status(500).json({ error: 'Error fetching cloths', details: err.message });
    }
}



async function SearchClothByProductCategory(req, res) {
    const searchQuery = req.query.query || ''; // Get the search query from the query parameter

    if (!searchQuery) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        // Reference to the "cloths" collection in Firestore
        const clothCollectionRef = Cloth; // Assuming Cloth is your collection reference

        // Get all products (you can consider adding pagination if you have a lot of data)
        const querySnapshot = await getDocs(clothCollectionRef);

        if (querySnapshot.empty) {
            return res.status(404).json({ message: 'No products found matching your query' });
        }

        // Map through the querySnapshot and return the cloth data
        const clothList = querySnapshot.docs.map(doc => doc.data());

        // Create a regular expression for the search query
        const regex = new RegExp(`\\b${searchQuery}\\b`, 'i'); // 'i' for case-insensitive matching

        // Filter the clothList to only include products where the category matches the query as a whole word
        const filteredList = clothList.filter(item =>
            regex.test(item.productCategoryD) // Use regex to match whole words in the category
        );

        // Return the matching products
        if (filteredList.length > 0) {
            return res.json(filteredList);
        } else {
            return res.status(404).json({ message: 'No products found containing the search query' });
        }

    } catch (err) {
        console.error('Error fetching cloths:', err);
        return res.status(500).json({ error: 'Error fetching cloths', details: err.message });
    }
}



async function FetchClothById(req, res) {
    console.log('Request Query:', req.query); // Log request query parameters

    const { id } = req.query;

    try {
        // Validate ID
        if (!id) {
            return res.status(400).send({ msg: "ID is required to fetch cloth" });
        }

        // Query Firestore to find the document with the given ID
        const clothQuery = query(Cloth, where("idD", "==", Number(id)));
        const clothSnapshot = await getDocs(clothQuery);

        if (clothSnapshot.empty) {
            return res.status(404).send({ msg: "Cloth with the given ID not found" });
        }

        // Extract and send the fetched data
        const clothData = clothSnapshot.docs[0].data();
        res.send({ msg: "Cloth fetched successfully", data: clothData });
    } catch (err) {
        console.error("Error fetching cloth by ID:", err);
        res.status(500).send({ msg: "Error fetching cloth", error: err.message });
    }
}



async function UpdateClothById(req, res) {
    console.log('Request Body:', req.body); // Log request body

    const { id, name, price, size, color, detail, image, category, productCategory, brand,originalPrice,quantity , rating} = req.body;

    try {
        // Validate ID
        if (!id) {
            return res.status(400).send({ msg: "ID is required to update cloth" });
        }

        // Query Firestore to find the document with the given ID
        const clothQuery = query(Cloth, where("idD", "==", Number(id)));
        const clothSnapshot = await getDocs(clothQuery);

        if (clothSnapshot.empty) {
            return res.status(404).send({ msg: "Cloth with the given ID not found" });
        }

        // Get the document ID and existing data
        const docId = clothSnapshot.docs[0].id;
        const existingData = clothSnapshot.docs[0].data();

        // Build the updated cloth object by merging new and existing data
        const updatedCloth = {
            ...existingData, // Start with existing data
            ...(name && { nameD: name }),
            ...(price && { priceD: Number(price) }),
            ...(size && { sizeD: Array.isArray(size) ? size : [size] }),
            ...(color && { colorD: Array.isArray(color) ? color : [color] }),
            ...(detail && { detailD: detail }),
            ...(image && { imageD: image }),
            ...(category && { categoryD: category }),
            ...(productCategory && { productCategoryD: productCategory }),
            ...(brand && { brandD: brand }),
            ...(originalPrice && { originalPriceD: Number(originalPrice) }),
            ...(quantity && { quantityD: Number(quantity) }),
            ...(rating && { ratingD: Number(rating) }),
        };

        // Update the document in Firestore
        const clothDocRef = doc(Cloth, docId);
        await updateDoc(clothDocRef, updatedCloth);

        res.send({ msg: "Cloth updated successfully", data: updatedCloth });
    } catch (err) {
        console.error("Error updating cloth:", err);
        res.status(500).send({ msg: "Error updating cloth", error: err.message });
    }
}



async function BuyProduct(req, res) {
    const { items } = req.body; // items is an array of products in the cart

    try {
        // Validate inputs
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).send({ msg: "Cart is empty or invalid" });
        }

        let updatedProducts = [];

        // Loop through each item in the cart to process the purchase
        for (let i = 0; i < items.length; i++) {
            const { productId, quantityToBuy } = items[i];

            // Validate each product
            if (!productId || quantityToBuy === undefined) {
                return res.status(400).send({ msg: "Product ID and quantity to buy are required for all items" });
            }

            // Fetch the cloth product by ID (assuming the productId corresponds to idD)
            const clothQuery = query(Cloth, where("idD", "==", Number(productId)));
            const clothSnapshot = await getDocs(clothQuery);

            if (clothSnapshot.empty) {
                return res.status(404).send({ msg: `Cloth with ID ${productId} not found` });
            }

            const clothData = clothSnapshot.docs[0].data();
            const currentQuantity = clothData.quantityD;

            // Check if there is enough stock for the purchase
            if (currentQuantity <= 0) {
                return res.status(400).send({ msg: `Product ${productId} is out of stock` });
            }

            if (currentQuantity < quantityToBuy) {
                return res.status(400).send({ msg: `Not enough stock for product ${productId}` });
            }

            // Calculate the new quantity after the purchase
            const newQuantity = currentQuantity - quantityToBuy;

            // Update the product's quantity in the database
            if (newQuantity <= 0) {
                await updateDoc(doc(Cloth, clothSnapshot.docs[0].id), { quantityD: 0 });  // Mark as unavailable
                updatedProducts.push({ ...clothData, quantityD: 0, msg: `Product ${productId} purchased successfully, but it's now out of stock` });
            } else {
                await updateDoc(doc(Cloth, clothSnapshot.docs[0].id), { quantityD: newQuantity });
                updatedProducts.push({ ...clothData, quantityD: newQuantity, msg: `Product ${productId} purchased successfully` });
            }
        }

        // Send back the response with all the updated products
        res.send({ msg: "Products purchased successfully", updatedProducts });
    } catch (err) {
        console.error("Error purchasing product:", err);
        res.status(500).send({ msg: "Error purchasing products", error: err.message });
    }
}



async function FilterCloths(req, res) {
    const { size, color, name, category, priceRange, ratingRange } = req.query;

    try {
        // Reference to the "cloths" collection
        const clothCollectionRef = Cloth;
        let clothQuery = query(clothCollectionRef);

        // Filter by name (if provided)
        if (name) {
            clothQuery = query(clothQuery, where("nameD", ">=", name), where("nameD", "<=", name + "\uf8ff"));
        }

        // Filter by category (if provided)
        if (category) {
            clothQuery = query(clothQuery, where("categoryD", "==", category));
        }

        // Filter by price range (if provided)
        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split("-");
            clothQuery = query(clothQuery, where("priceD", ">=", Number(minPrice)), where("priceD", "<=", Number(maxPrice)));
        }

        // Filter by rating range (if provided)
        if (ratingRange) {
            const [minRating, maxRating] = ratingRange.split("-");
            clothQuery = query(clothQuery, where("ratingD", ">=", Number(minRating)), where("ratingD", "<=", Number(maxRating)));
        }

        // Get cloths based on first filter (size)
        let cloths = [];
        if (size) {
            const sizeQuery = query(clothCollectionRef, where("sizeD", "array-contains", size));
            const sizeSnapshot = await getDocs(sizeQuery);
            cloths = sizeSnapshot.docs.map(doc => doc.data());
        }

        // Get cloths based on second filter (color) and merge with previous results
        if (color) {
            const colorQuery = query(clothCollectionRef, where("colorD", "array-contains", color));
            const colorSnapshot = await getDocs(colorQuery);
            const colorCloths = colorSnapshot.docs.map(doc => doc.data());
            
            // Merge the size and color results, removing duplicates
            cloths = cloths.filter(cloth => colorCloths.some(c => c.id === cloth.id));
        }

        // Return results
        if (cloths.length === 0) {
            return res.status(404).json({ message: "No products found matching the filters" });
        }
        
        res.json(cloths);

    } catch (err) {
        console.error('Error fetching filtered cloths:', err);
        return res.status(500).json({ error: 'Error fetching filtered cloths', details: err.message });
    }
}





module.exports = { AddCloths, AllClothsDetails, SearchClothByName, SearchClothByDetail, SearchClothByCategory, SearchClothByProductCategory,FetchClothById,UpdateClothById,BuyProduct ,FilterCloths };