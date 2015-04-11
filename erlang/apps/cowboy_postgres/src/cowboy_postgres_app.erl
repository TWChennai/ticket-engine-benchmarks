-module(cowboy_postgres_app).

-behaviour(application).

%% Application callbacks
-export([start/0, start/2, stop/1]).

%% ===================================================================
%% Application callbacks
%% ===================================================================

start() ->
	ok.

start(_StartType, _StartArgs) ->
    cowboy_postgres_sup:start_link().

stop(_State) ->
    ok.
