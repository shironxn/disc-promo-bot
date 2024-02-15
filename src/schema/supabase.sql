create table
  public.promotion (
    id bigint generated by default as identity,
    name character varying not null,
    message text null,
    delay smallint null,
    interval smallint null,
    channel_id character varying[] null,
    created_at timestamp with time zone not null default now(),
    constraint promotion_pkey primary key (id)
  ) tablespace pg_default;