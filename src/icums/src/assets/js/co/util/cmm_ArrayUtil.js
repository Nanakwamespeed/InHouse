/**
 * ArrayUtil
 *
 * Seo Yongki
 */
var ArrayUtil = {

    /**
	 * Verifies that an array is empty
	 *
	 * ArrayUtil.isEmpty(null);           // true
	 * ArrayUtil.isEmpty(undefined);      // true
	 * ArrayUtil.isEmpty([]);             // true
	 * ArrayUtil.isEmpty([0,1,2]);        // false
     */
    isEmpty: function(array) {
    	return ObjectUtil.hasNoValue(array) || array.length === 0;
    },

    /**
     * Verifies that an array isn't empty
     *
     * ArrayUtil.isNotEmpty(null);        // false
     * ArrayUtil.isNotEmpty(undefined);   // false
     * ArrayUtil.isNotEmpty([]);          // false
     * ArrayUtil.isNotEmpty([0,1,2]);     // true
     */
    isNotEmpty: function(array) {
    	return ObjectUtil.hasValue(array) && array.length > 0;
    },

    /**
     * Returns an array with just the items for which the
     * given property matches the given value
     *
     * e.g. ArrayUtil.filterBy([
     *           {resourcetype: 0},
     *           {resourcetype: 2},
     *           {resourcetype: 0}
     *      ], 'resourcetype', 0)
     * will return a new array containing only the first and third
     * elements of the original array.
     *
     * @param array: the array to filter
     * @param property: the property to filter by
     * @param value: the value that property must have in order for an element to be included in the result
     * @returns {T[]}: a new array containing only the elements that have property matching value
     */
    filterBy: function(array, property, value) {
    	return array.filter(function(element){
    		return element[property] === value;
    	});
    },

    /**
     * Returns the first items in the given array for which the
     * given property matches the given value
     *
     * e.g. ArrayUtil.findBy([
     *           {resourcetype: 0},
     *           {resourcetype: 2},
     *           {resourcetype: 0}
     *      ], 'resourcetype', 0)
     * will return the first element of the original array.
     *
     * @param array: the array to search through
     * @param property: the property to check
     * @param value: the value that property must have in order for an element to match
     * @returns {T}: the first element in the array that has property matching value
     */
    findBy: function(array, property, value) {
    	if(this.isEmpty(array)){
    		return null;
    	}
    	return array.find(function(element){
    		return StringUtil.equals(element[property], value);
    	});
    },

    /**
     * findBy와 동일하나 ObservableArray를 검색하고자 하는 경우 사용 :: same as the line - however use it when you want to search ObservableArray
     */
    findArray: function(array, property, value) {
      for(let i = 0; i<array.length; i++){
        if(array[i][property] === value){
          return array[i];
        }
      }
      return null;
    },

    /**
     * Object에서 속성값으로 첫번째 index 찾기 :: find first index as attribute value 
     */
    findIndex: function(array, property, value) {
      for(let i = 0; i<array.length; i++){
    	if(array[i][property] === value){
    	  return i;
        }
      }
      return -1;
    },

    /**
     * array를 특정 속성을 기준으로 정렬함 :: columnize it using the Line specific attribute as standard 
     * ArrayUtil.orderBy(array, ['item', 'itemNm'], ['asc', 'desc']); // item속성으로 정방향 정렬, itemNm속성으로 역방향 정렬 :: column in the right direction with the attribute. Column in the opposite direction with itemNm attribute
     */
    orderBy: function(array, propArr, ordArr) {
    	return _.orderBy(array, propArr, ordArr);
    },

    /**
     * array를 keyArr 순서로 정렬함 :: arrange it in the order of keyArr
     * ArrayUtil.reOrder(codeList, 'item', ['1', '3', '2', '4', '5', '6', '7', '8', '9']);
     */
    reOrder: function(array, property, keyArr) {
      const rtnArray = [];
      keyArr.forEach(function(key, idx) {
        const item = this.findBy(array, property, key);
        if(ObjectUtil.hasValue(item)){
          rtnArray.push(item);
        }
      });
      return rtnArray;
    },

    /**
     * Returns a new array containing the value of the given property
     * for all elements of the given array.
     *
     * @param array: the array to map
     * @param property: the property to map by
     * @returns {[]}: a new array containing the values the elements in the original array had for the given property.
     */
    mapBy: function(array, property) {
    	return array.map(function(element) {
    		return element[property];
    	});
    },

    /**
     * 배열에서 특정 항목을 제외함 :: Exclude specific categories from the arrangement
     * ["a", "b", "c"] => ArrayUtil.remove(array, 'b') => ["a", c"]
     */
    remove: function(array, value) {
      const i = array.indexOf(value);
      if(i !== -1) {
        array.splice(i, 1);
      }
      return array;
    },

    /**
     * 배열에서 특정 항목을 제외함 :: Exclude specific categories from the arrangement
     * ["a", "b", "c"] => ArrayUtil.remove(array, 'b') => ["a", c"]
     */
    removeBy: function(array, property, value) {
    	for(let i = array.length-1; i >= 0; i--){
    		if(StringUtil.equals(array[i][property], value)){
    			array.splice(i, 1);
    		}
    	}
    	return array;
    },

    /**
     * 배열에 키값이 동일한 항목을 변경 :: change the same key value in the arrangement
     */
    setBy: function(array, property, value) {
    	if(this.isEmpty(array)){
    		return null;
    	}

    	for(var i=0; i<array.length; i++){
			var item = array[i];
			if(StringUtil.equals(item[property], value[property])){
				array.splice(i, 1, value);
			}
		}
    	return array;
    },

    /**
     * 배열의 특정 위치에 item을 추가함 :: add item to the specific location of the arrangement 
     * ["a", "b", "c"] => ArrayUtil.insert(array, 1, 'd') => ["a", "d", "b", c"]
     */
    insert: function(array, index, item) {
      if(index !== -1) {
        array.splice(index, 0, item);
      }
      return array;
    },

    /**
     * 배열의 특정 속성값을 value로 채움 :: fill the value in the specific attribute value in the arrangement 
     * ArrayUtil.fill(array, 'chkSel', false);
     */
    fill: function(array, property, value) {
      for(let i = 0; i<array.length; i++){
        array[i][property] = value;
      }
      return array;
    },

    /**
     * 배열의 특정 속성값을 map으로 변경함 :: change the map of specific attribute value in the arrangement 
     * const map: Map<string, any> = new Map<string, any>();
     * map.set('Y', true);
     * map.set('N', false);
     * ArrayUtil.fillBy(array, 'chkSel', map); // chkSel이 Y이면 true, N이면 false로 변경 :: change to true if it is Y. change to false if it is N 
     */
    fillBy: function(array, property, cMap) {
      let bfValue = '';
      for(let i = 0; i<array.length; i++){
        bfValue = array[i][property];
        array[i][property] = cMap.get(bfValue);
      }
      return array;
    },

    /**
     * 기존 배열에 새로운 배열을 추가함 :: Add new arrangement to the existing arrangement 
     * ArrayUtil.pushAll(array, addArray);
     */
    pushAll: function(array, items) {
      items.forEach(function(item, idx) {
        array.push(item);
      });
      return array;
    },

    /**
     * 기존 배열을 복사하여 새로운 배열을 생성함 :: copy the existing arrangement and create a new arrangement 
     * ArrayUtil.copy(array);
     */
    copy: function(array) {
      const rtnArray = [];
      array.forEach(function(item, idx){
        rtnArray.push(Object.assign({}, item));
      });
      return rtnArray;
    },

    /**
     * Array값의 동일여부를 체크한다. :: check if the value is the same 
     */
    arraysEqual: function(a, b) {
    	return _.isEqual(a, b);
    },

    /**
     * checkbox Array 변환: checkbox값 변환시 1개인 경우 string반환됨 -> array변환 필요 :: change: when changing the value of the checkbox, if there is only one, change it to string -> change to array is needed
     */
    checkToArray: function(value){
    	if(ObjectUtil.hasNoValue(value)){ // 미선택 :: unselected 
    		return [];
    	}else if(typeof value == 'string'){ // 단건 선택 :: single selected
    		const rtnArray = [];
    		rtnArray.push(value);
    		return rtnArray;
    	}else{ // 다건 선택
    		if(value.includes('on')){ // all이 선택된 경우 :: all selected
    			this.remove(value, 'on');
    		}
    		return value;
    	}
    },

	/**
	 * ArrayList를 Tree Object로 변환 :: change it to Tree Object 
	 *
	 * data : ArrayList : child ID, parent ID is required(default : cNode, pNode)
	 * options : {parentProperty: 'pNode', customID: 'cNode'}
	 */
    arrayToTree: function(data, options){
      options = _.assign({
	    parentProperty: 'pNode',
	    customID: 'cNode',
	    rootID: '00000'
	  }, options);

	  if (!_.isArray(data)) {
		  throw new TypeError('Expected an object but got an invalid argument');
	  }
	  const grouped = this.groupByParents(data, options);
	  return this.createTree(grouped, grouped[options.rootID], options.customID);
	},

	/**
	 * 동일 parent ID를 갖는 item끼리 그루핑작업을 진행 :: Grouping items with the same parent ID 
	 */
	groupByParents: function (array, options){
	  const arrayByID = _.keyBy(array, options.customID);

	  return array.reduce(function(prev, item) {
	    let parentID = getNestedProperty(item, options.parentProperty);
	    if (!parentID || !arrayByID.hasOwnProperty(parentID)) {
	      parentID = options.rootID;
	    }

	    if (parentID && prev.hasOwnProperty(parentID)) {
	      prev[parentID].push(item);
	      return prev;
	    }

	    prev[parentID] = [item];
	    return prev;
	  }, {});
	},

	/**
	 * Tree Object를 생성한다. :: create
	 */
	createTree: function (array, rootNodes, customID) {
	  const tree = [];

	  for (var rootNode in rootNodes) {
		if (!rootNodes.hasOwnProperty(rootNode)) {
	      continue ;
	    }
	    const node = rootNodes[rootNode];
	    const childNode = array[node[customID]];

	    if (!node && !rootNodes.hasOwnProperty(rootNode)) {
	      continue ;
	    }

	    if (childNode) {
	      node.children = this.createTree(array, childNode, customID);
	    }

	    tree.push(node);
	  }

	  return tree;
	},

	/**
	 * Tree Object를 Array로 반환한다. :: change it to Array
	 * items: treeSource, key: child key(children)
	 */
	flattenItems: function(items, key){
		return items.reduce(function(flattenedItems, item){
	      flattenedItems.push(item);
	      if (Array.isArray(item[key])) {
	        flattenedItems = flattenedItems.concat(this.flattenItems(item[key], key));
	      }
	      return flattenedItems;
	    }, []);
	}
}


