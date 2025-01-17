/**
 * This class displays some short game infos e.g Map name.
 */
class BuildLabel
{
	constructor(playerViewControl)
	{
		this.mapCache = new MapCache();

		this.viewPlayer = Engine.GetGUIObjectByName("viewPlayer");
		this.shortGameInfosLabel = Engine.GetGUIObjectByName("shortGameInfosLabel");
		this.shortGameInfosLabel.caption = Engine.IsAtlasRunning() ? "" : sprintf("%(icon_alpha)s Alpha XXV  %(icon_map)s %(mapName)s%(mapSize)s%(biome)s  %(icon_pop)s %(pop)s  %(rating)s", {
			"icon_alpha": '[icon="icon_alpha" displace="0 4"]',
			"icon_map": '[icon="icon_map" displace="2 6"]',
			"mapName": this.mapCache.translateMapName(this.mapCache.getTranslatableMapName(g_InitAttributes.mapType, g_InitAttributes.map)),
			"mapSize": g_InitAttributes.mapType == "random" ? " - " + g_MapSizes.Name[g_MapSizes.Tiles.indexOf(g_InitAttributes.settings.Size)] : "",
			"biome": g_InitAttributes.settings.Biome ? " - " + g_Settings.Biomes.find(b => b.Id == g_InitAttributes.settings.Biome).Title : "",
			"icon_pop": '[icon="icon_pop" displace="3 5"]',
			"pop": g_InitAttributes.settings.PopulationCap !== undefined ? g_PopulationCapacities.Title[g_PopulationCapacities.Population.indexOf(g_InitAttributes.settings.PopulationCap)] : g_WorldPopulationCapacities.Title[g_WorldPopulationCapacities.Population.indexOf(g_InitAttributes.settings.WorldPopulationCap)] + " (WP)",
			"rating": g_InitAttributes.settings.RatingEnabled === true ? '[icon="icon_rating" displace="-3 5"]' + coloredText("Rated game", "red") : ""
			});
		playerViewControl.registerViewedPlayerChangeHandler(this.onViewedPlayerChange.bind(this));
	}
	
	onViewedPlayerChange()
	{
		// Following gaia can be interesting on scripted maps
		this.shortGameInfosLabel.hidden = !g_IsObserver || g_ViewedPlayer > 0;
	}		
}
