<script>
  import { getContext } from "svelte";
  import PresetForm from "./components/PresetForm.svelte";
  import Statblock from "./components/Statblock.svelte";
  import TypeForm from "./components/TypeForm.svelte";
  import HpAcForm from "./components/HpAcForm.svelte";
  import SpeedForm from "./components/SpeedForm.svelte";
  import AbilitiesForm from "./components/AbilitiesForm.svelte";
  import Proficiency from "./components/Proficiency.svelte";

  const statblock = getContext("statblock");
</script>

<div id="stat-block-body" style="min-width: 1000px;">
  <div class="container">
    <div class="content">
      <h1>D&D 5e Statblock Generator</h1>
      <br />
      <br />
      <PresetForm />
      <br />

      <Statblock />

      <div class="options">
        <form>
          <label for="1col-input">
            <input
              id="1col-input"
              type="radio"
              name="columns-input"
              value="1col"
              checked
            />
            One Column
          </label>
          <label for="2col-input" style="margin-left: .5rem;">
            <input
              id="2col-input"
              type="radio"
              name="columns-input"
              value="2col"
            />
            Two Columns
          </label>
        </form>
        <button
          id="left-separator-button"
          type="button"
          data-onclick="UpdateBlockFromVariables(1)"
        >
          &lt;&lt;
        </button>
        <button
          id="right-separator-button"
          type="button"
          data-onclick="UpdateBlockFromVariables(-1)"
        >
          >>
        </button>
        <hr />
        <TypeForm />
        <hr />
        <HpAcForm />
        <SpeedForm />
        <hr />
        <AbilitiesForm />
        <hr />
        <div class="group" id="properties-lists-form">
          <div class="row">
            <Proficiency />
            <div id="conditions-form">
              <label for="conditions-input">Condition Immunities:</label>
              <br />
              <select id="conditions-input">
                <option value="blinded">Blinded</option>
                <option value="charmed">Charmed</option>
                <option value="deafened">Deafened</option>
                <option value="exhaustion">Exhaustion</option>
                <option value="frightened">Frightened</option>
                <option value="grappled">Grappled</option>
                <option value="incapacitated">Incapacitated</option>
                <option value="invisible">Invisible</option>
                <option value="paralyzed">Paralyzed</option>
                <option value="petrified">Petrified</option>
                <option value="poisoned">Poisoned</option>
                <option value="prone">Prone</option>
                <option value="restrained">Restrained</option>
                <option value="stunned">Stunned</option>
                <option value="unconscious">Unconscious</option>
              </select>
              <button
                type="button"
                data-onclick="InputFunctions.AddConditionInput()"
              >
                Immune
              </button>
              <div id="conditions-input-section">
                <ul id="conditions-input-list" class="statblock-list"></ul>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="group">
          <div class="row">
            <div id="damagetypes-form">
              <label for="damagetypes-input">
                Damage Types:
                <br />
                <select
                  id="damagetypes-input"
                  data-onchange="FormFunctions.ShowHideDamageOther()"
                >
                  <option value="acid">Acid</option>
                  <option value="bludgeoning">Bludgeoning</option>
                  <option value="cold">Cold</option>
                  <option value="fire">Fire</option>
                  <option value="force">Force</option>
                  <option value="lightning">Lightning</option>
                  <option value="necrotic">Necrotic</option>
                  <option value="piercing">Piercing</option>
                  <option value="poison">Poison</option>
                  <option value="psychic">Psychic</option>
                  <option value="radiant">Radiant</option>
                  <option value="slashing">Slashing</option>
                  <option value="thunder">Thunder</option>
                  <option
                    value="bludgeoning, piercing, and slashing from nonmagical attacks"
                  >
                    Nonmagical Attacks
                  </option>
                  <option
                    value="bludgeoning, piercing, and slashing from nonmagical attacks that aren't silvered"
                  >
                    Non-Silvered Attacks
                  </option>
                  <option
                    value="bludgeoning, piercing, and slashing from nonmagical attacks that aren't adamantine"
                  >
                    Non-Adamantine Attacks
                  </option>
                  <option value="*">Other</option>
                </select>
              </label>
              <div><input id="other-damage-input" type="text" value="" /></div>
              <div>
                <button
                  type="button"
                  data-onclick="InputFunctions.AddDamageTypeInput('v')"
                >
                  Vulnerable
                </button>
                <button
                  type="button"
                  data-onclick="InputFunctions.AddDamageTypeInput('r')"
                >
                  Resistant
                </button>
                <button
                  type="button"
                  data-onclick="InputFunctions.AddDamageTypeInput('i')"
                >
                  Immune
                </button>
              </div>
              <div id="damage-input-section">
                <ul id="damage-input-list" class="statblock-list"></ul>
              </div>
            </div>
            <div id="languages-form">
              <label for="languages-input">
                Languages:
                <br />
                <select
                  id="languages-input"
                  data-onchange="FormFunctions.ShowHideLanguageOther()"
                >
                  <option value="All">All</option>
                  <option value="Abyssal">Abyssal</option>
                  <option value="Aquan">Aquan</option>
                  <option value="Auran">Auran</option>
                  <option value="Celestial">Celestial</option>
                  <option value="Common">Common</option>
                  <option value="Deep Speech">Deep Speech</option>
                  <option value="Draconic">Draconic</option>
                  <option value="Dwarvish">Dwarvish</option>
                  <option value="Elvish">Elvish</option>
                  <option value="Giant">Giant</option>
                  <option value="Gnomish">Gnomish</option>
                  <option value="Goblin">Goblin</option>
                  <option value="Halfling">Halfling</option>
                  <option value="Ignan">Ignan</option>
                  <option value="Infernal">Infernal</option>
                  <option value="Orc">Orc</option>
                  <option value="Primordial">Primordial</option>
                  <option value="Sylvan">Sylvan</option>
                  <option value="Terran">Terran</option>
                  <option value="Undercommon">Undercommon</option>
                  <option value="*">Other</option>
                </select>
              </label>
              <label for="telepathy-input" style="margin-left: .5rem;">
                Telepathy:
                <br />
                <input
                  type="number"
                  id="telepathy-input"
                  min="0"
                  max="995"
                  step="5"
                  value="0"
                />
                ft.
              </label>
              <div>
                <input id="other-language-input" type="text" value="" />
              </div>
              <div>
                <button
                  type="button"
                  data-onclick="InputFunctions.AddLanguageInput(true)"
                >
                  Speaks
                </button>
                <button
                  type="button"
                  data-onclick="InputFunctions.AddLanguageInput(false)"
                >
                  Understands
                </button>
                but
                <input
                  id="understands-but-input"
                  type="text"
                  value="can't speak"
                />
              </div>
              <div id="languages-input-section">
                <ul id="languages-input-list" class="statblock-list"></ul>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div class="group" id="senses-form">
          <div class="row">
            <div>
              <label for="blindsight-input">
                Blindsight: <input
                  type="number"
                  id="blindsight-input"
                  min="0"
                  max="995"
                  step="5"
                  value="0"
                  data-onchange="FormFunctions.ShowHideBlindBox()"
                />
                ft.
              </label>
              <br />
              <div id="blind-box-note" class="box-note">
                <label for="blindness-input">
                  (Blind beyond: <input type="checkbox" id="blindness-input" />
                  )
                </label>
              </div>
            </div>
            <div>
              <label for="darkvision-input">
                Darkvision: <input
                  type="number"
                  id="darkvision-input"
                  min="0"
                  max="995"
                  step="5"
                  value="0"
                />
                ft.
              </label>
            </div>
            <div>
              <label for="tremorsense-input">
                Tremorsense: <input
                  type="number"
                  id="tremorsense-input"
                  min="0"
                  max="995"
                  step="5"
                  value="0"
                />
                ft.
              </label>
            </div>
            <div>
              <label for="truesight-input">
                Truesight: <input
                  type="number"
                  id="truesight-input"
                  min="0"
                  max="995"
                  step="5"
                  value="0"
                />
                ft.
              </label>
            </div>
          </div>
        </div>
        <br />
        <div id="cr-form">
          <label for="cr-input">
            Challenge Rating:
            <select
              id="cr-input"
              data-onchange="InputFunctions.InputCR()"
            ></select>
          </label>
          <br />
          <div id="prof-bonus"></div>
          <div id="custom-cr">
            <label for="custom-cr-input">
              CR Text: <input
                id="custom-cr-input"
                type="text"
                value="1 (200 XP)"
                placeholder="Leave blank to hide"
                style="width: 16rem;"
              />
            </label>
            <br />
            <label for="custom-prof-input">
              Proficiency Bonus: <input
                type="number"
                id="custom-prof-input"
                min="-99"
                max="99"
                value="2"
              />
            </label>
          </div>
          <br />
        </div>
        <hr />
        <div class="group">
          <div class="row">
            <div>
              <label
                for="short-name-input"
                style="width: 100%; text-align: right;"
              >
                Shortened Name:
              </label>
            </div>
            <div>
              <input
                id="short-name-input"
                type="text"
                value=""
                placeholder="None"
                style="width: 30%;"
              />
              <div class="tooltip">
                ?
                <span class="tooltiptext">
                  This will replace [MON] in ability text, unless left blank.
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div>
              <label
                for="plural-name-input"
                style="text-align: right; width: 100%;"
              >
                Shortened Plural:
              </label>
            </div>
            <div>
              <input
                id="plural-name-input"
                type="text"
                value=""
                placeholder="None"
                style="width: 30%;"
              />
              <div class="tooltip">
                ?
                <span class="tooltiptext">
                  This will replace [MONS] in ability text, unless left blank.
                </span>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <label for="is-legendary-input">
            <b>Legendary Creature:</b>
            <input
              type="checkbox"
              id="is-legendary-input"
              data-onclick="FormFunctions.ShowHideLegendaryCreature()"
            />
          </label>
        </div>
        <div id="legendary-actions-form">
          <br />
          <label for="is-mythic-input">
            <b>Mythic:</b>
            <input
              type="checkbox"
              id="is-mythic-input"
              data-onclick="FormFunctions.ShowHideMythicCreature()"
            />
          </label>
          <label for="has-lair-input">
            <b>Lair:</b>
            <input
              type="checkbox"
              id="has-lair-input"
              data-onclick="FormFunctions.ShowHideLair()"
            />
          </label>
          <label for="has-regional-input">
            <b>Regional:</b>
            <input
              type="checkbox"
              id="has-regional-input"
              data-onclick="FormFunctions.ShowHideRegional()"
            />
          </label>
          <br />
          <br />
          <b>Legendary Actions Description:</b>
          <div>
            <label for="legendaries-descsection-input" style="width: 100%">
              <textarea id="legendaries-descsection-input" rows="4"></textarea>
            </label>
          </div>
          <div>
            <button
              type="button"
              data-onclick="InputFunctions.LegendaryDescriptionDefaultInput()"
            >
              Reset to Default
            </button>
          </div>
        </div>
        <div id="mythic-actions-form">
          <br />
          <b>Mythic Actions Description:</b>
          <div>
            <label for="mythic-descsection-input" style="width: 100%">
              <textarea id="mythic-descsection-input" rows="4"></textarea>
            </label>
          </div>
          <div>
            <button
              type="button"
              data-onclick="InputFunctions.MythicDescriptionDefaultInput()"
            >
              Reset to Default
            </button>
          </div>
        </div>
        <div id="lair-actions-form">
          <br />
          <b>Lair Actions Description:</b>
          <div>
            <label for="lair-descsection-input" style="width: 100%">
              <textarea id="lair-descsection-input" rows="4"></textarea>
            </label>
          </div>
          <b>Lair Actions End Note Description:</b>
          <div>
            <label for="lair-end-descsection-input" style="width: 100%">
              <textarea id="lair-end-descsection-input" rows="4"></textarea>
            </label>
          </div>
          <div>
            <button
              type="button"
              data-onclick="InputFunctions.LairDescriptionDefaultInput()"
            >
              Reset to Default
            </button>
          </div>
        </div>
        <div id="regional-actions-form">
          <br />
          <b>Regional Effects Description:</b>
          <div>
            <label for="regional-descsection-input" style="width: 100%">
              <textarea id="regional-descsection-input" rows="4"></textarea>
            </label>
          </div>
          <b>Regional Effects End Note Description:</b>
          <div>
            <label for="regional-end-descsection-input" style="width: 100%">
              <textarea id="regional-end-descsection-input" rows="4"></textarea>
            </label>
          </div>
          <div>
            <button
              type="button"
              data-onclick="InputFunctions.RegionalDescriptionDefaultInput()"
            >
              Reset to Default
            </button>
          </div>
        </div>
        <br />
        <b>Abilities:</b>
        <div>
          <label for="abilities-name-input" style="width: 100%;">
            Name: <input
              id="abilities-name-input"
              type="text"
              value=""
              style="margin-right: 40px; width: 30%;"
            />
          </label>
        </div>
        <div>
          <textarea id="abilities-desc-input" style="height: 10em;"></textarea>
        </div>
        <div>
          <button
            type="button"
            id="add-ability-button"
            data-onclick="InputFunctions.AddAbilityInput('abilities')"
          >
            Add Ability
          </button>
          <button
            type="button"
            id="add-action-button"
            data-onclick="InputFunctions.AddAbilityInput('actions')"
          >
            Add Action
          </button>
          <button
            type="button"
            id="add-bonus-action-button"
            data-onclick="InputFunctions.AddAbilityInput('bonusActions')"
          >
            Add Bonus Action
          </button>
          <button
            type="button"
            id="add-reaction-button"
            data-onclick="InputFunctions.AddAbilityInput('reactions')"
          >
            Add Reaction
          </button>
          <button
            type="button"
            id="add-legendary-button"
            data-onclick="InputFunctions.AddAbilityInput('legendaries')"
          >
            Add Legendary Action
          </button>
          <button
            type="button"
            id="add-mythic-button"
            data-onclick="InputFunctions.AddAbilityInput('mythics')"
          >
            Add Mythic Action
          </button>
          <button
            type="button"
            id="add-lair-button"
            data-onclick="InputFunctions.AddAbilityInput('lairs')"
          >
            Add Lair Action
          </button>
          <button
            type="button"
            id="add-regional-button"
            data-onclick="InputFunctions.AddAbilityInput('regionals')"
          >
            Add Regional Effect
          </button>
        </div>
        <div>
          <select id="common-ability-input"></select>
          <button
            type="button"
            id="add-common-ability-button"
            data-onclick="InputFunctions.AddCommonAbilityInput()"
          >
            Use Preset
          </button>
        </div>
        <div>
          <label for="format-helper-checkbox">
            Show Formatting Help: <input
              type="checkbox"
              id="format-helper-checkbox"
              data-onclick="FormFunctions.ShowHideFormatHelper()"
            />
          </label>
        </div>
        <div id="format-helper" style="text-align: left; padding: 0 2rem;">
          <br />
          <div>
            Use _ to italicize and ** to bold. For Spellcasting lists, use > to
            reverse-indent.
          </div>
          <br />
          <div>
            <b>[MON]</b>
            : Shows the monster's name.
          </div>
          <div>
            <b>[CHA]</b>
            : Shows the monster's charisma modifier.
          </div>
          <div>
            <b>[3D6]</b>
            : Computes 3d6.
          </div>
          <div>
            <b>[STR ATK]</b>
            : Calculates the modifier to the monster's attack roll for a strength-based
            attack.
          </div>
          <div>
            <b>[DEX 2D8]</b>
            : Calculates the damage roll for a dexterity-based attack with damage
            dice 2d8.
          </div>
          <div>
            <b>[WIS SAVE]</b>
            : Calculates the save DC vs the monster's wisdom.
          </div>
          <div>
            <b>[3D6 + 1], [STR ATK - 2], [WIS SAVE + 3]</b>
            : Adds a modifier to the given values.
          </div>
          <br />
        </div>
        <div style="text-align: left; min-height: 5rem;">
          <div id="abilities-input-section">
            <b>Abilities:</b>
            <br />
            <ul id="abilities-input-list" class="statblock-list"></ul>
          </div>
          <div id="actions-input-section">
            <b>Actions:</b>
            <br />
            <ul id="actions-input-list" class="statblock-list"></ul>
          </div>
          <div id="bonusActions-input-section">
            <b>Bonus Actions:</b>
            <br />
            <ul id="bonusActions-input-list" class="statblock-list"></ul>
          </div>
          <div id="reactions-input-section">
            <b>Reactions:</b>
            <br />
            <ul id="reactions-input-list" class="statblock-list"></ul>
          </div>
          <div id="legendaries-input-section">
            <b>Legendary Actions:</b>
            <br />
            <ul id="legendaries-input-list" class="statblock-list"></ul>
          </div>
          <div id="mythic-input-section">
            <b>Mythic Actions:</b>
            <br />
            <ul id="mythics-input-list" class="statblock-list"></ul>
          </div>
          <div id="lairs-input-section">
            <b>Lair Actions:</b>
            <br />
            <ul id="lairs-input-list" class="statblock-list"></ul>
          </div>
          <div id="regionals-input-section">
            <b>Regional Effects:</b>
            <br />
            <ul id="regionals-input-list" class="statblock-list"></ul>
          </div>
        </div>
        <br />
      </div>
    </div>
  </div>
</div>

<style>
  .indent {
    text-indent: 1rem;
  }

  .reverse-indent {
    text-indent: -1rem;
    padding-left: 1rem;
  }

  .removable-list-item:hover {
    color: red;
    text-decoration: line-through;
    cursor: pointer;
  }

  .statblock-image {
    width: 12px;
    height: 12px;
    cursor: pointer;
  }

  .statblock-list {
    text-align: left;
    margin: 4px 4px 0.5rem;
    padding-left: 16px;
  }

  #understands-but-input {
    width: 8rem;
  }

  #other-language-input {
    width: 16rem;
  }

  #format-helper {
    font-style: italic;
  }

  #legendaries-descsection {
    margin: 8px 0 0;
  }

  #stat-helper tr {
    border-bottom: 1px solid;
  }

  #stat-helper td,
  #stat-helper th {
    text-align: center;
    border-left: 1px solid;
    min-width: 3rem;
    padding: 0 0.5rem;
  }

  #stat-helper .left-td {
    border-left: none;
    text-align: left;
    padding-left: 0px;
    font-weight: bold;
  }

  @media screen and (min-width: 992px) {
    #stat-block-body {
      background-image: url("statblockbkg.jpg");
    }
  }
</style>
