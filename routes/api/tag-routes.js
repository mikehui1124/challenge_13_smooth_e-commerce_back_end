const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product, through: ProductTag, as:'tag_products' }]
    });
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as:'tag_products' }]
    });

    //console.log(tagData);
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id! Pleas check' });
      return; 
    }
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', (req, res) => {
    /* req.body should look like...
    {
      tag_name: "Garment",      
      tag_products: [1, 2, 3, 4]
    }
  */
    Tag.create(req.body)
    .then((tag) => {
      // if there's tag's products, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tag_products.length) {
        const productTagIdArr = req.body.tag_products.map((product_id) => {
          return {
            product_id,
            // tag_id: tag_id
            tag_id: tag.id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no related products, just respond
      res.status(200).json(tag);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
    /* req.body should look like...
    {
      tag_name: "Garment",      
      tag_products: [1, 2, 3, 4]
    }
  */
  Tag.update({    
    tag_name: req.body.tag_name,    
    tag_products: req.body.tag_products   
  }, 
  {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .then((tag) => {
      // find all associated products[] from ProductTag
      return ProductTag.findAll({ where: { tag_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ product_id }) => product_id);
      // create filtered list of new product_ids
      const newTagProducts = req.body.tag_products
        .filter((product_id) => !productTagIds.includes(product_id))
        .map((product_id) => {
          return {
            product_id,
            tag_id: req.params.id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ product_id }) => !req.body.tag_products.includes(product_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newTagProducts),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
  
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id! Please check' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }  
});

module.exports = router;
