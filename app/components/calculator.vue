<template>
  <UCard
    class="w-full max-w-lg"
    :ui="{ body: { padding: 'px-4 py-5 sm:p-6' } }"
  >
    <template #header>
      <div class="text-center">
        <h1 class="text-2xl font-bold text-primary">Pace & Grade Pro</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Advanced calculators for runners and hikers
        </p>
      </div>
    </template>

    <UTabs :items="tabItems" v-model="store.activeTabIndex" class="w-full">
      <template #item="{ item }">
        <div class="text-gray-500 font-normal mt-6 text-sm">
          Insert two values to convert
        </div>
        <div v-if="item.key === 'pace'" class="space-y-4 pt-4">
          <!-- Pace Calculator Inputs -->
          <UFormGroup label="Distance">
            <div class="flex space-x-2">
              <UInput
                v-model.number="store.pace.distance"
                type="number"
                placeholder="e.g., 10"
                class="w-full"
                @keydown.enter="store.calculate"
                @blur="store.calculate"
              />
              <USelectMenu
                v-model="store.pace.distanceUnit"
                :options="['km', 'm', 'mi', 'ft']"
              />
            </div>
          </UFormGroup>
          <UFormGroup label="Time">
            <UInput
              v-model="store.pace.time"
              placeholder="hh:mm:ss"
              @keydown.enter="store.calculate"
              @blur="store.calculate"
            />
          </UFormGroup>
          <UFormGroup label="Pace">
            <div class="flex space-x-2">
              <UInput
                v-model="store.pace.pace"
                placeholder="mm:ss"
                class="w-full"
                @keydown.enter="store.calculate"
                @blur="store.calculate"
              />
              <USelectMenu
                v-model="store.pace.paceUnit"
                :options="['/ km', '/ mi']"
              />
            </div>
          </UFormGroup>
        </div>

        <div v-if="item.key === 'grade'" class="space-y-4 pt-4">
          <!-- Grade Calculator Inputs -->
          <UFormGroup label="Distance">
            <div class="flex space-x-2">
              <UInput
                v-model.number="store.grade.distance"
                type="number"
                placeholder="e.g., 1000"
                class="w-full"
                @keydown.enter="store.calculate"
                @blur="store.calculate"
              />
              <USelectMenu
                v-model="store.grade.distanceUnit"
                :options="['km', 'm', 'mi', 'ft']"
              />
            </div>
          </UFormGroup>
          <UFormGroup label="Elevation Gain">
            <div class="flex space-x-2">
              <UInput
                v-model.number="store.grade.elevation"
                type="number"
                placeholder="e.g., 150"
                class="w-full"
                @keydown.enter="store.calculate"
                @blur="store.calculate"
              />
              <USelectMenu
                v-model="store.grade.elevationUnit"
                :options="['m', 'ft']"
              />
            </div>
          </UFormGroup>
          <UFormGroup label="Elevation Grade (%)">
            <UInput
              v-model.number="store.grade.grade"
              type="number"
              placeholder="e.g., 15"
              @keydown.enter="store.calculate"
              @blur="store.calculate"
            />
          </UFormGroup>
        </div>
      </template>
    </UTabs>

    <!-- Training Tip Display -->
    <UAlert
      v-if="trainingTip"
      icon="i-heroicons-light-bulb"
      color="primary"
      variant="subtle"
      title="Training Tip"
      :description="trainingTip"
      class="mt-4"
    />

    <template #footer>
      <UButton
        @click="store.clearInputs"
        block
        color="gray"
        variant="ghost"
        label="Clear All"
      />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { useCalculatorStore } from "~/store/calculator";

const store = useCalculatorStore();
const toast = useToast();
const isLoadingTip = ref(false);
const trainingTip = ref("");

const tabItems = [
  {
    key: "pace",
    label: "Running Pace",
    icon: "i-heroicons-user-group",
  },
  {
    key: "grade",
    label: "Hiking Grade",
    icon: "i-heroicons-globe-alt",
  },
];
</script>
