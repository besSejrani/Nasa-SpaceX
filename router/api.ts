import { Router } from "../deps.ts";
import * as planets from "../models/planet.ts";
import * as launches from "../models/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = `
    {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__


                    Mission Control API`;
});

router.get("/planets", (ctx) => {
  ctx.response.body = planets.getAllPlanets();
});

router.get("/launches/:id", (ctx) => {
  const id = Number(ctx.params.id);
  ctx.response.body = launches.getLaunch(id);
});

router.post("/launches", async (ctx) => {
  const body = await ctx.request.body().value;
  launches.addLaunch(body);

  ctx.response.body = { success: true };
  ctx.response.status = 201;
});

router.delete("/launches/:id", (ctx) => {
  const id = Number(ctx.params.id);
  const result = launches.removeLaunch(id);
  ctx.response.body = { success: result };
});

router.get("/launches", (ctx) => {
  ctx.response.body = launches.getLaunches();
});

export default router;
