<script>
  import markdownit from "markdown-it";
  import { getContext } from "svelte";
  import {
    getArmorData,
    getHP,
    formatAbilityScore,
    getChallengeRating,
    displaySpeedDescription,
    formatProfSkillBonus,
  } from "../helpers/formatHelpers";
  import { abilityScores } from "../constants";

  const statblock = getContext("statblock");
  const md = markdownit();
</script>

<div id="stat-block-wrapper">
  <div id="stat-block" class="stat-block">
    <hr class="orange-border" />
    <div class="section-left">
      <div class="creature-heading">
        <h1 id="monster-name">{$statblock.name}</h1>
        <h2 id="monster-type">
          <span>{$statblock.size},</span>
          <span>
            {$statblock.type}{$statblock.tag ? ` (${$statblock.tag})` : ""},
          </span>
          <span>{$statblock.alignment}</span>
        </h2>
      </div>
      <!-- creature heading -->
      <svg height="5" width="100%" class="tapered-rule">
        <polyline points="0,0 400,2.5 0,5"></polyline>
      </svg>
      <div class="top-stats">
        <div class="property-line first">
          <h4>Armor Class</h4>
          <p id="armor-class">
            {@html md.renderInline(getArmorData($statblock))}
          </p>
        </div>
        <!-- property line -->
        <div class="property-line">
          <h4>Hit Points</h4>
          <p id="hit-points">{getHP($statblock)}</p>
        </div>
        <!-- property line -->
        <div class="property-line last">
          <h4>Speed</h4>
          <p id="speed">{displaySpeedDescription($statblock)}</p>
          <br />
          {#if Object.values($statblock.sthrows).filter((x) => x).length}
            <h4>Saving Throws</h4>
            <p>
              {Object.entries($statblock.sthrows)
                .map(
                  ([value, skillLevel]) =>
                    value.toLocaleUpperCase() +
                    " " +
                    formatProfSkillBonus(
                      skillLevel,
                      $statblock.pb,
                      $statblock[value],
                    ),
                )
                .join(", ")}
            </p>
          {/if}
        </div>
        <!-- property line -->
        <svg height="5" width="100%" class="tapered-rule">
          <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>
        <div class="scores">
          {#each abilityScores as abilityScore}
            <div>
              <h4>{abilityScore.value.toLocaleUpperCase()}</h4>
              <p>
                {formatAbilityScore($statblock[abilityScore.value])}
              </p>
            </div>
          {/each}
        </div>
        <!-- scores -->
        <svg height="5" width="100%" class="tapered-rule">
          <polyline points="0,0 400,2.5 0,5"></polyline>
        </svg>
        <div id="properties-list"></div>
        <div id="challenge-rating-line" class="property-line last">
          <h4>Challenge</h4>
          <p id="challenge-rating">{getChallengeRating($statblock)}</p>
        </div>
        <!-- property line -->
      </div>
      <!-- top stats -->
      <svg height="5" width="100%" class="tapered-rule">
        <polyline points="0,0 400,2.5 0,5"></polyline>
      </svg>
      <div class="actions">
        <div id="traits-list-left"></div>
      </div>
      <!-- actions -->
    </div>
    <!-- section left -->
    <div class="section-right">
      <div class="actions">
        <div id="traits-list-right"></div>
      </div>
      <!-- actions -->
    </div>
    <!-- section right -->
    <hr class="orange-border bottom" />
  </div>
</div>

<style>
  #stat-block-wrapper {
    margin: 1rem auto;
    display: block;
    width: fit-content;
    box-shadow: 0 0 1.5rem #867453;
  }
  .stat-block {
    text-align: left;
    font-size: 12.5px;
    line-height: 1.2em;
    display: inline-block;
    vertical-align: top;
    width: 400px;
    background: #fdf1dc;
    background-size: cover;
    background-position: center;
    background-image: url("statblockparch.jpg");
    padding: 10px 10px 20px;
    box-sizing: border-box;
    font-family: "Noto Sans", "Myriad Pro", Calibri, Helvetica, Arial,
      sans-serif;
  }

  .orange-border {
    display: block;
    background: #e69a28;
    background-size: cover;
    background-position: center;
    background-image: url("statblockbar.jpg");
    border: 1px solid #000;
    height: 5px;
    padding: 0 10px 0;
    margin: -10px -10px 0;
    box-sizing: initial;
  }

  .orange-border.bottom {
    margin: 15px -10px -20px;
  }

  .tapered-rule {
    display: block;
    width: 100%;
    height: 5px;
    border: none;
    color: #922610;
    fill: #922610;
  }

  .creature-heading {
    margin: 0 0 10px;
  }

  .creature-heading h1 {
    font-family: "Libre Baskerville", "Lora", "Calisto MT", "Bookman Old Style",
      Bookman, "Goudy Old Style", Garamond, "Hoefler Text", "Bitstream Charter",
      Georgia, serif;
    color: #922610;
    font-size: 21px;
    line-height: 1.2em;
    margin: 10px 0 0;
    letter-spacing: 1px;
    font-variant: small-caps;
    font-weight: bold;
  }

  .creature-heading h2 {
    font-family: "Noto Sans", "Myriad Pro", Calibri, Helvetica, Arial,
      sans-serif;
    font-weight: normal;
    font-style: italic;
    font-size: 12px;
    line-height: 1.2em;
    margin: 0;
  }

  .property-line h4,
  .property-line p {
    display: inline;
    margin: 0;
    color: #922610;
    font-size: 12.5px;
    line-height: 1.2em;
  }

  .property-line {
    line-height: 1.4em;
  }

  .property-line.first {
    margin: 8px 0 0;
  }

  .property-line.last {
    margin: 0 0 10px;
  }

  .scores {
    text-align: center;
    color: #922610;
  }

  .scores > div {
    display: inline-block;
    vertical-align: middle;
    width: 15.5%;
    min-width: 40px;
    font-size: 12px;
    line-height: 1em;
  }

  .scores h4 {
    margin: 10px 0 2px;
    font-size: 14px;
    line-height: 1.2em;
    text-transform: uppercase;
  }

  h4 {
    color: #922610;
  }

  .scores p {
    margin: 0 0 10px;
    line-height: 1.2em;
  }

  .actions {
    margin: 0 0 20px;
  }

  .actions:last-child {
    margin: 0;
  }

  .top-stats {
    /* Fix for a weird bug that I can't figure out the cause of */
    margin: 0 0 10px;
  }
</style>
