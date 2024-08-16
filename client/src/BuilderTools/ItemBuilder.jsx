import { useEffect, useState } from 'react'

function ItemBuilder(props) {
  const [itemList, setItemList] = useState([]);
  const [showI, setShowI] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [currItem, setCurrItem] = useState("");
  const [itemFocused, setItemFocused] = useState(false);
  const [sentFetch, setSentFetch] = useState(false);

  const compareItem = (a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    const storedItemList = localStorage.getItem('full-item-list');
    if (storedItemList) {
      setItemList(JSON.parse(storedItemList).list.sort(compareItem));
      setFilteredList(itemList);
    }
    setSentFetch(true);
  }, []);

  useEffect(() => {
    if (sentFetch && itemList.length === 0) {
      fetchList();
    }
  }, [sentFetch]);

  useEffect(() => {
    if (currItem !== "") {
      const filtered = itemList.filter(item =>
        item.name.toLowerCase().startsWith(currItem.toLowerCase())
      );
      setFilteredList(filtered);
    } else {
      setFilteredList(itemList);
    }
  }, [currItem]);

  const fetchList = async () => {
    const response = await fetch('/api/item/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
    });

    const jsonPromise = await response.json();

    if (response.ok) {
      console.log(await jsonPromise);
      setItemList(jsonPromise.list.sort(compareItem));
      setFilteredList(itemList);
      localStorage.setItem('full-item-list', JSON.stringify(jsonPromise));
    } else {
      console.log('Error with getting list');
    }
  }

  const select_item = (event) => {
    event.preventDefault();
    setCurrItem(event.target.textContent);
  }

  const itemSetter = async (event) => {
    setCurrItem(event.target.value);
  }

  const handleItemFocus = () => {
    if (!itemFocused) {
      setItemFocused(true);
      setShowI(true);
    }
  }

  const handleItemBlur = () => {
    setTimeout(() => {
      if (itemFocused) {
        setItemFocused(false);
        setShowI(false);
      }
    }, 150) ;
  }
  return (
    <>
        <div className="relative group">
          <label htmlFor="name" className="form-label">
            Item:
            <input
              id="name"
              autoComplete="off"
              className="block w-half px-4 py-2 text-gray-800 border rounded-md border-gray-300 focus:outline-none"
              onChange={itemSetter}
              onFocus={handleItemFocus}
              onBlur={handleItemBlur}
              value={currItem}
              placeholder="Enter Item name..."
            />
          </label>
          {showI && (
            <div className="absolute z-10 w-auto mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {filteredList.map((item, index) => (
                <a
                  key={index}
                  onClick={select_item}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                >
                  <span className="inline-block align-middle">
                    <img src={item.icon} className="w-6 h-6 text-gray-400" />
                  </span>
                  <span className="inline-block align-middle ml-2">
                    {item.name}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
    </>
  );
}

export default ItemBuilder
