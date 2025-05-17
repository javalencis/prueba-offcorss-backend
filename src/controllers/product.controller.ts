export const getProducts = async (req: any, res: any) => {
  const { _from, _to, ft } = req.query;

  const queryParams = new URLSearchParams();
  if (_from) queryParams.append("_from", _from as string);
  if (_to) queryParams.append("_to", _to as string);
  if (ft) queryParams.append("ft", ft as string);

  const vtexURL = `https://offcorss.myvtex.com/api/catalog_system/pub/products/search?${queryParams.toString()}`;

  try {
    const response = await fetch(vtexURL);
    const data = await response.json();

    const resourcesHeader = response.headers.get("resources");
    if (resourcesHeader) {
      res.setHeader("resources", resourcesHeader);
      res.setHeader("Access-Control-Expose-Headers", "resources");
    }

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error al consumir API:", error);
    res.status(500).json({ error: "Error al consultar API" });
  }
};

export const getProductById = async (req: any, res: any) => {
  const { productId } = req.params;

  const vtexURL = `https://offcorss.myvtex.com/api/catalog_system/pub/products/search?fq=productId:${productId}`;

  try {
    const response = await fetch(vtexURL);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error al consultar producto por ID:", error);
    res
      .status(500)
      .json({ error: "Error al consultar producto por ID en VTEX" });
  }
};
