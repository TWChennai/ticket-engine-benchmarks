package session

import "regexp"

var (
	Regexp = regexp.MustCompile("^/session/(.*?)$")
)
