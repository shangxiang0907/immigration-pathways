import assert from "node:assert/strict";
import { matchingRuleSets } from "../src/data/matching/index.mjs";
import { projectProfile, rankCountries, summarizeCountry } from "../src/lib/unified-profile.mjs";
const profile={age:"under45",experience:"twoPlus",english:"yes",jobOffer:"germany",education:"postsecondary",funds:"yes",regional:"yes",qualification:"yes"};
const p=projectProfile(profile);
assert.equal(p.australia.under45,"yes"); assert.equal(p.australia.assessment,"yes"); assert.equal(p.canada.years,"two"); assert.equal(p.germany.job,"yes"); assert.equal(p.germany.recognized,"yes"); assert.equal(p.canada.offer,"unknown");
assert.deepEqual(summarizeCountry({a:{fail:[],unknown:["x"]},b:{fail:["x"],unknown:[]}}),{total:2,viable:1,knownBarriers:0,missing:1});
const ranked=rankCountries(profile,matchingRuleSets); assert.equal(ranked[0].countryId,"germany"); assert.equal(ranked[0].bestProgramId,"germany-opportunity-card"); assert.equal(ranked[0].total,3); assert.ok(ranked[0].viable>0);
const blocked=rankCountries({...profile,funds:"no",qualification:"no",jobOffer:"none"},matchingRuleSets);const germany=blocked.find(x=>x.countryId==="germany");assert.ok(germany.barrierKeys.length>0);assert.ok(germany.bestProgramId);
const nzProfile=projectProfile({...profile,jobOffer:"new-zealand"});assert.equal(nzProfile["new-zealand"].nzJob,"yes");assert.equal(rankCountries({...profile,jobOffer:"new-zealand"},matchingRuleSets).find(x=>x.countryId==="new-zealand").total,3);
const ukProfile=projectProfile({...profile,jobOffer:"united-kingdom"});assert.equal(ukProfile["united-kingdom"].ukJob,"yes");assert.equal(ukProfile["united-kingdom"].ukEnglish,"yes");assert.equal(rankCountries({...profile,jobOffer:"united-kingdom"},matchingRuleSets).find(x=>x.countryId==="united-kingdom").total,3);
for(const country of ["ireland","netherlands","france","portugal"]){const result=rankCountries({...profile,jobOffer:country},matchingRuleSets).find(x=>x.countryId===country);assert.equal(result.total,2);}
for(const country of ["spain","japan","singapore","united-states"]){const result=rankCountries({...profile,jobOffer:country},matchingRuleSets).find(x=>x.countryId===country);assert.equal(result.total,2);}
for(const country of ["austria","denmark","finland","norway"]){const result=rankCountries({...profile,jobOffer:country},matchingRuleSets).find(x=>x.countryId===country);assert.equal(result.total,2);}
console.log("unified profile tests passed");
