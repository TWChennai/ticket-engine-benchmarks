%%%-------------------------------------------------------------------
%%% @author devarajn
%%% @copyright (C) 2015, <COMPANY>
%%% @doc
%%%
%%% @end
%%% Created : 10. Apr 2015 11:39 PM
%%%-------------------------------------------------------------------
-module(orderapi_session_resource).

%% API
-export([
  init/1,
  to_json/2,
  content_types_provided/2,
  allowed_methods/2
]).

-include_lib("webmachine/include/webmachine.hrl").

-spec init(list()) -> {ok, term()}.
init([]) ->
  {ok, undefined}.

allowed_methods(RD, Ctx) ->
  {['GET'], RD, Ctx}.

content_types_provided(RD, Ctx) ->
  {[{"application/json", to_json}], RD, Ctx}.

to_json(RD, Ctx) ->
  {
    json_body(connect()), RD, Ctx
  }.

connect() ->
  {ok, C} = epgsql:connect("localhost", "postgres", "", [
    {database, "cinemas"},
    {timeout, 4000}
  ]),
  {ok, Meta, Data} = epgsql:squery(C, "select * from sessions"),
  ok = epgsql:close(C),
  Data.

json_body(BinaryList) -> mochijson:binary_encode(BinaryList).
