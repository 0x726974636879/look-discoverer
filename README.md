
# Look discoverer

Visualize metadata on a list of fashion looks crawled from the site lookbook through a simple API and interface.

The data for this project is provided as a ndjson file listing around 5000 fashion looks, with pictures and metadata.

For each look, we have the following data:

- ID
- Name
- Country
- Hashtags
- Image md5
- “Hype” count

## Requirements
Docker v20.x

## API
### Develop an API to interact with the looks by implementing the two following routes. You must use Python for this.

#### List the looks
- Return all the looks
- Return filtered subset of looks.
- This route can either return all the looks or a filtered subset of looks.
- Handle at least two filters: on the country or on a specific hashtag.
- Handle pagination
- Sort the looks by decreasing “Hype” count.

#### Update a look
- A look can be updated in the three following ways: 
	- Changing it’s “Hype” count
	- Adding a hashtag
	- Removing a hashtag.
- The data we are trying to update stays coherent.

## Visualize the looks
Using the API you made, develop a simple interface to visualize the looks using a table.
Each line of the table should display the metadata of one look along with its icon.
The interface should make use of all the API functionalities.
Also, clicking on the icon of a look should redirect to the original image.
