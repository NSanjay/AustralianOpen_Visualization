library(ggplot2)
library(ggmap)
library(maps)
library(rgdal)
library(maptools)

a_map <- map('county', 'arizona', fill = TRUE, col = palette())
az_county_data <- subset(map_data("county"),region=="arizona")
names(az_county_data) <- c("long", "lat", "group", "order", "state_name", "COUNTY")
az_county_data$STATE <- state.abb[match(az_county_data$state_name, tolower(state.name))]
az_county_data$state_name <- NULL

election_data_shp <- readOGR("L:\\ASU_Study\\3rd Sem\\Data Visualization\\lab_map_2019\\2012election\\elpo12p010g.shp")
names(election_data_shp) <- c("STATE", "STATE_FIPS", "COUNTY", "FIPS", "OBAMA", "ROMNEY", "OTHERS", "TTL_VT", "PCT_OBM","PCT_ROM","PCT_OTHR","WINNER","PCT_WNR","?")

arizona <- subset(election_data_shp,STATE=="AZ")
arizona$COUNTY <- tolower(arizona$COUNTY)

final_az_election_map <- merge(az_county_data, arizona, by= c("STATE", "COUNTY"))


ggplot(final_az_election_map, aes(long, lat, group=group)) +
  scale_fill_manual(values=c("blue","red"))+
  geom_polygon(aes(fill = WINNER)) +
  geom_polygon(data= az_county_data, colour= "white", fill = NA)