package helpers

func Diff(list1 []string, list2 []string) (diff []string) {
	var empty struct{}
	list2Map := make(map[string]struct{})
	for _, val := range list2 {
		list2Map[val] = empty
	}

	for _, val := range list1 {
		_, exist := list2Map[val]
		if !exist {
			diff = append(diff, val)
		}
	}
	return
}
